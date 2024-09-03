import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const express = require('express');

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];
let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
   if (!cachedServer) {
      const expressApp = express();
      const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), { cors: true })
      nestApp.use(eventContext());
      // nestApp.setGlobalPrefix('starwars-api')
      await nestApp.init();
      cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
   }
   return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
   cachedServer = await bootstrapServer();
   console.log("REQUEST::",JSON.stringify(event))
   console.log("REQUEST::RESOURCE::",event.resource)
   console.log("REQUEST::pathParameters::",event.pathParameters)
   if (
      event.body &&
      getContentType(event)
   ) {
      //event.body = (Buffer.from(event.body, 'binary') as unknown) as string;  
      console.log("REQUEST::BODY::",'binary')
   }else{
      console.log("REQUEST::BODY::",event.body)
   }
   const response=await proxy(cachedServer, event, context, 'PROMISE').promise;
   console.log("REPONSE::",JSON.stringify(response))
   return response
}
function getContentType(event: any){
   try {
      return event.headers['Content-Type'].includes('multipart/form-data')
   } catch (error) {
      return event.headers['content-type'].includes('multipart/form-data')
   }
}
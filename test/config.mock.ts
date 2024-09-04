import { ConfigService } from "@nestjs/config";

export const configServiceMock=(configService:ConfigService)=>{
    return jest.spyOn(configService, 'get').mockImplementation(key => {
        return {
          DYNAMO_DB_TABLE: process.env.DYNAMO_DB_TABLE,
          API_URL_BASE: process.env.API_URL_BASE
        }[key];
      });
}
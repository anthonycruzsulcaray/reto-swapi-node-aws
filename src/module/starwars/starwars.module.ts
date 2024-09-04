import { Module } from '@nestjs/common';
import { StarwarsService } from './starwars.service';
import { StarwarsController } from './starwars.controller';
import { HttpModule } from "@nestjs/axios";
import { FilmsApiRest } from '../api/films';
import DynamoRepository from '../repository/dynamo/films.repository';
import DynamoDataBase from '../db/dynamo';
import { TranslateObject } from '../../utils/translateObject';
import FilmsValidator from '../../validation/filmsValidation';

@Module({
  imports: [HttpModule],
  controllers: [StarwarsController],
  providers: [StarwarsService,FilmsApiRest,DynamoRepository,DynamoDataBase,TranslateObject,FilmsValidator]
})
export class StarwarsModule {}

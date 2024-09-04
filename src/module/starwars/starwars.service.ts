import { Injectable } from '@nestjs/common';
import { FilmsApiRest } from '../api/films';
import DynamoRepository from '../repository/dynamo/films.repository';
import { TranslateObject } from '../../utils/translateObject';
import { TranslateFilmsResponse } from './data/response';
import FilmsValidator from '../../validation/filmsValidation';
import { FilmRequest } from './data/request';


@Injectable()
export class StarwarsService {

  constructor(private apiFilms: FilmsApiRest, private dynamoRepository: DynamoRepository, private translate: TranslateObject, private validator: FilmsValidator) { }

  async listall(): Promise<any> {
    // dynamo
    const resultRest = await this.dynamoRepository.listAll()
    console.log("resultRest:::  ", resultRest)
    let dataResponse: TranslateFilmsResponse[] = [];
    for (var i = 0; i < resultRest.length; i++) {
      const dynamoId = resultRest[i].id
      const item = resultRest[i].data
      // translate
      const films = this.translate.filmsToSpanish(dynamoId, item)
      dataResponse.push(films)
    }
    console.log("dataResponse::: ", dataResponse)
    return dataResponse;
  }

  async listById(id: number): Promise<any> {
    // api startwars
    const swapiResponse = await this.apiFilms.listById(id)
    // dynamo
    await this.dynamoRepository.add(id, swapiResponse)
    // translate
    const films = this.translate.filmsToSpanish(id, swapiResponse)
    return films;
  }

  async add(bodyFilm: FilmRequest): Promise<any> {
    this.validator.validate(bodyFilm)
    bodyFilm.creado = new Date().toDateString()
    bodyFilm.id = (await this.dynamoRepository.listAll()).length + 1
    // dynamo
    // translate
    const filmToEnglish = this.translate.filmsToEnglish(bodyFilm.id, bodyFilm)
    await this.dynamoRepository.add(filmToEnglish.id,filmToEnglish)
    return bodyFilm;
  }



}

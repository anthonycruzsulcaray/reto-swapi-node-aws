import { Injectable } from '@nestjs/common';
import { FilmsApiRest } from '../api/films';
import DynamoRepository from '../repository/dynamo/films.repository';
import { TranslateObject } from '../../utils/translateObject';
import FilmsValidator from '../../validation/filmsValidation';
import { FilmRequest } from './data/request';
import { TranslateFilmsResponse } from './data/response';


@Injectable()
export class StarwarsService {

  constructor(private readonly apiFilms: FilmsApiRest, private readonly dynamoRepository: DynamoRepository,
    private readonly translate: TranslateObject, private readonly validator: FilmsValidator) { }

  async listall(): Promise<TranslateFilmsResponse[]> {
    // dynamo
    const resultRest = await this.dynamoRepository.listAll()
    console.log("resultRest:::  ", resultRest)
    let dataResponse: TranslateFilmsResponse[] = [];
    for (let value of resultRest) {
      const dynamoId = value.id
      const item = value.data
      // translate
      const films = this.translate.filmsToSpanish(dynamoId, item)
      dataResponse.push(films)
    }
    console.log("dataResponse::: ", dataResponse)

    return dataResponse;
  }

  async listById(id: number): Promise<TranslateFilmsResponse> {
    // api startwars
    const swapiResponse = await this.apiFilms.listById(id)
    // dynamo
    await this.dynamoRepository.add(id, swapiResponse)
    // translate
    const films = this.translate.filmsToSpanish(id, swapiResponse)
    return films;
  }

  async add(bodyFilm: FilmRequest): Promise<TranslateFilmsResponse> {
    this.validator.validate(bodyFilm)
    bodyFilm.creado = new Date().toDateString()
    // dynamo
    bodyFilm.id = (await this.dynamoRepository.listAll()).length + 1
    // translate
    const filmToEnglish = this.translate.filmsToEnglish(bodyFilm.id, bodyFilm)
    await this.dynamoRepository.add(filmToEnglish.id, filmToEnglish)
    return bodyFilm;
  }



}

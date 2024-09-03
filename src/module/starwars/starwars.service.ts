import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class StarwarsService {
  private dynamoDb: DynamoDB.DocumentClient = new DynamoDB.DocumentClient();

  constructor(private readonly httpService: HttpService) { }

  async getCharacter(id: string): Promise<any> {
    // Obtener datos del personaje de SWAPI
    const swapiResponse = await this.httpService.get(`https://swapi.py4e.com/api/people/${id}/`).toPromise();
    const characterData = swapiResponse.data;


    // Guardar o actualizar personaje en DynamoDB

    /*
    await this.dynamoDb.put({
      TableName: process.env.DYNAMO_DB_TABLE,
      Item: {
        id,
        data: characterData,
      },
    }).promise();
    */
    return characterData;
  }


  async getCharactersFromDynamoDB(): Promise<any> {
    const result = await this.dynamoDb.scan({
      TableName: process.env.DYNAMO_DB_TABLE,
    }).promise();

    return result.Items;
  }


}

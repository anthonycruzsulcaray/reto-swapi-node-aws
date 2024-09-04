import { Injectable } from '@nestjs/common';
import DynamoDataBase from '../../db/dynamo';


@Injectable()
export default class DynamoRepository {
    private dynamoConn: AWS.DynamoDB.DocumentClient

    constructor(dydb: DynamoDataBase) {
        this.dynamoConn = dydb.dynamoClient()
    }

    // listAll - Listar todo
    async listAll() {
        var params = {
            TableName: process.env.DYNAMO_DB_TABLE
        };
        return (await this.dynamoConn.scan(params).promise()).Items
    }

    // listById - Listar por id
    async listById(id: number) {
        var params = {
            TableName: process.env.DYNAMO_DB_TABLE,
            Key: {
                id: id
            },

        };
        return await this.dynamoConn.get(params).promise();
    }

    // add - Agregar
    async add(idFilm: number, bodyFilm: any) {
        await this.dynamoConn.put({
            TableName: process.env.DYNAMO_DB_TABLE,
            Item: {
                id: idFilm,
                data: bodyFilm,
            },
        }).promise();
    }


}

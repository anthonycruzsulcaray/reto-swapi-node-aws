import { Injectable } from '@nestjs/common';
import DynamoDataBase from '../../db/dynamo';


@Injectable()
export default class DynamoRepository {
    private readonly dynamoConn: AWS.DynamoDB.DocumentClient

    constructor(dydb: DynamoDataBase) {
        this.dynamoConn = dydb.dynamoClient()
    }

    async listAll() {
        const params = {
            TableName: process.env.DYNAMO_DB_TABLE
        };
        return (await this.dynamoConn.scan(params).promise()).Items
    }

    async listById(id: number) {
        const params = {
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

import { Injectable, Logger } from '@nestjs/common';
import DynamoDataBase from '../../db/dynamo';


@Injectable()
export default class DynamoRepository {
    private readonly dynamoConn: AWS.DynamoDB.DocumentClient
    private readonly logger = new Logger(DynamoRepository.name); // Instancia del logger

    constructor(dydb: DynamoDataBase) {
        this.dynamoConn = dydb.dynamoClient()
    }

    async listAll() {
        try {
            const params = {
                TableName: process.env.DYNAMO_DB_TABLE
            };
            return (await this.dynamoConn.scan(params).promise()).Items
        } catch (error) {
            this.logger.error('Error al listar todos los elementos', error.stack);
            throw new Error('No se pudieron listar los elementos');
        }
    }

    async listById(id: number) {
        try {
            const params = {
                TableName: process.env.DYNAMO_DB_TABLE,
                Key: {
                    id: id
                },

            };
            return await this.dynamoConn.get(params).promise();
        } catch (error) {
            this.logger.error(`Error al obtener el elemento con ID: ${id}`, error.stack);
            throw new Error('No se pudo obtener el elemento por ID');
        }
    }

    // add - Agregar
    async add(idFilm: number, bodyFilm: any) {
        try {
            await this.dynamoConn.put({
                TableName: process.env.DYNAMO_DB_TABLE,
                Item: {
                    id: idFilm,
                    data: bodyFilm,
                },
            }).promise();
        } catch (error) {
            this.logger.error(`Error al agregar la película con ID: ${idFilm}`, error.stack);
            throw new Error('No se pudo agregar la película');
        }
    }


}

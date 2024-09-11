import { instance, mock, when, verify, anything, deepEqual } from 'ts-mockito';

import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk';
import DynamoDataBase from '../../src/module/db/dynamo';
import DynamoRepository from '../../src/module/repository/dynamo/films.repository';

describe('DynamoRepository', () => {
    let dynamoRepository: DynamoRepository;
    let mockedDynamoDB: DynamoDataBase;
    let mockedDocumentClient: DocumentClient;

    beforeEach(() => {
        // Crear los mocks
        mockedDynamoDB = mock(DynamoDataBase);
        mockedDocumentClient = mock(DocumentClient);

        // Crear una respuesta mock
        const mockPutResponse: PromiseResult<DocumentClient.PutItemOutput, AWSError> = {
            $response: {} as any, // Puedes dejar esto vacío para la prueba
        };

        // Configurar comportamiento del mock
        when(mockedDynamoDB.dynamoClient()).thenReturn(instance(mockedDocumentClient));
        when(mockedDocumentClient.put(anything()).promise()).thenResolve(mockPutResponse);

        // Crear una instancia real de DynamoRepository utilizando los mocks
        dynamoRepository = new DynamoRepository(instance(mockedDynamoDB));
    });

    it('debería agregar una película al DynamoDB', async () => {
        const id = 1;
        const pelicula = { title: "Una Nueva Esperanza" };

        // Ejecutar el método
        await dynamoRepository.add(id, pelicula);

        // Verificar que se llamó a `put` con los parámetros correctos
        verify(mockedDocumentClient.put(deepEqual({
            TableName: process.env.DYNAMO_DB_TABLE,
            Item: {
                id: id.toString(),
                data: pelicula,
            }
        })).promise()).once();
    });
});
``

import { Test } from "@nestjs/testing";
import DynamoDataBase from '../src/module/db/dynamo';
import DynamoRepository from '../src/module/repository/dynamo/films.repository';
import { StarwarsController } from '../src/module/starwars/starwars.controller';
import { ConfigService } from "@nestjs/config";
import { StarwarsService } from '../src/module/starwars/starwars.service';
import { FilmsApiRest } from '../src/module/api/films';
import { TranslateObject } from '../src/utils/translateObject';
import FilmsValidator from '../src/validation/filmsValidation';
import { configServiceMock } from "./config.mock";
import { instance } from 'ts-mockito';
import { TranslateFilmsResponse } from '../src/module/starwars/data/response';
//import { DocumentClient } from 'aws-sdk/clients/dynamodb';

describe('CARD MODULE', () => {
    let dynamoRepository: DynamoRepository;
    let mockedDynamoDB: DynamoDataBase;
    // let mockedDocumentClient: DocumentClient;

    let controller: StarwarsController;
    let configService: ConfigService;
    // let dynamoDB:DynamoRepository;
    
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [StarwarsController],
            providers: [{
                provide:"" ,
                useClass: TranslateFilmsResponse
            }, ConfigService,StarwarsService,FilmsApiRest,DynamoRepository,DynamoDataBase,TranslateObject,FilmsValidator]
        }).compile();
        configService =  moduleRef.get<ConfigService>(ConfigService);
        
        controller = moduleRef.get<StarwarsController>(StarwarsController);
        configServiceMock(configService);
        dynamoRepository = new DynamoRepository(instance(mockedDynamoDB));
    });

    describe('Listar todas las peliculas',()=>{
        it('Lista correcta',async ()=>{
            // jest.spyOn(dynamoDB, 'find');
            //ejecucion
            let result=await controller.listAll()
            await dynamoRepository.listAll();
            //expect 
            let resultId = result[0].id
            let resultTitulo = result[0].titulo
            expect(result[0].id).toEqual(resultId)
            expect(result[0].titulo).toEqual(resultTitulo)

        })


    });

});
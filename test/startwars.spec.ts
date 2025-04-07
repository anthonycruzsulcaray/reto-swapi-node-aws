import { Test, TestingModule } from '@nestjs/testing';
import { StarwarsController } from '../src/module/starwars/starwars.controller';
import { StarwarsService } from '../src/module/starwars/starwars.service';
import { FilmRequest } from '../src/module/starwars/data/request';
import { TranslateFilmsResponse } from '../src/module/starwars/data/response';
import { FilmsApiRest } from '../src/module/api/films';
import DynamoRepository from '../src/module/repository/dynamo/films.repository';
import DynamoDataBase from '../src/module/db/dynamo';
import { TranslateObject } from '../src/utils/translateObject';
import FilmsValidator from '../src/validation/filmsValidation';
import { StarwarsModule } from '../src/module/starwars/starwars.module';

describe('StarwarsController', () => {
    let controller: StarwarsController;
    let service: StarwarsService;
    let apiFilms: FilmsApiRest;
    let validator: FilmsValidator;
    let dynamoRepository: DynamoRepository;
    let translate: TranslateObject;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [StarwarsModule],
            controllers: [StarwarsController],
            providers: [
                StarwarsService, FilmsApiRest, DynamoRepository, DynamoDataBase, TranslateObject, FilmsValidator
            ],
        }).compile();

        controller = module.get<StarwarsController>(StarwarsController);
        service = module.get<StarwarsService>(StarwarsService);
        apiFilms = module.get<FilmsApiRest>(FilmsApiRest);
        validator = module.get<FilmsValidator>(FilmsValidator);
        dynamoRepository = module.get<DynamoRepository>(DynamoRepository);
        translate = module.get<TranslateObject>(TranslateObject);
    });

    it('Obtener listado de películas', async () => {

        const expectedResponse: TranslateFilmsResponse[] = [
            {
                id: 4,
                episodio_id: 1,
                titulo: 'The Phantom Menace',
                rastreo_apertura: "It is a period of civil war the galaxy....",
                director: "George Lucas",
                productor: "Gary Kurtz, Rick McCallum",
                fecha_lanzamiento: "1977-05-25",
                caracteres: [
                    "https://swapi.py4e.com/api/people/1/",
                    "https://swapi.py4e.com/api/people/2/"
                ],
                planetas: [
                    "https://swapi.py4e.com/api/planets/1/"
                ],
                naves_estelares: [
                    "https://swapi.py4e.com/api/starships/2/"
                ],
                vehiculos: [
                    "https://swapi.py4e.com/api/vehicles/4/"
                ],
                especies: [
                    "https://swapi.py4e.com/api/species/1/"
                ],
                creado: "2014-12-10T14:23:31.880000Z",
                editado: "2014-12-20T19:49:45.256000Z"
            }
        ];
        // Usar mockImplementation para emular la lógica del método
        jest.spyOn(service, 'listall').mockImplementation(() => {
            return Promise.resolve(expectedResponse);
        });
        const result = await controller.listAll();
        expect(service.listall).toHaveBeenCalled();
        expect(result).toEqual(expectedResponse);
    });


    it('Obtener una película por ID', async () => {
        const filmId = 99;


        const responseById = new TranslateFilmsResponse();

        Object.assign(responseById, {
            id: filmId,
            episodio_id: 99,
            titulo: 'The Phantom Menace',
            rastreo_apertura: "It is a period of civil war the galaxy....",
            director: "George Lucas",
            productor: "Gary Kurtz, Rick McCallum",
            fecha_lanzamiento: "1977-05-25",
            caracteres: [],
            planetas: [],
            naves_estelares: [],
            vehiculos: [],
            especies: [],
            creado: "2014-12-10T14:23:31.880000Z",
            editado: "2014-12-20T19:49:45.256000Z"
        });
        /*
        const responseById: TranslateFilmsResponse = {
            id: filmId,
            episodio_id: 99,
            titulo: 'The Phantom Menace',
            rastreo_apertura: "It is a period of civil war the galaxy....",
            director: "George Lucas",
            productor: "Gary Kurtz, Rick McCallum",
            fecha_lanzamiento: "1977-05-25",
            caracteres: [],
            planetas: [],
            naves_estelares: [],
            vehiculos: [],
            especies: [],
            creado: "2014-12-10T14:23:31.880000Z",
            editado: "2014-12-20T19:49:45.256000Z"
        };
        */


        // Mock del servicio
        jest.spyOn(service, 'listById').mockImplementation((_id: number) => {
            return Promise.resolve(responseById);
        });
        const result = await controller.listById(filmId.toString());
        expect(service.listById).toHaveBeenCalled();
        expect(result.episodio_id).toEqual(responseById.episodio_id);
        expect(result.planetas.length).toEqual(responseById.planetas.length);
    });


    it('Agregar una película', async () => {
        const newFilm: FilmRequest = {
            id: 1,
            episodio_id: 1,
            titulo: 'The Phantom Menace',
            rastreo_apertura: "It is a period of civil war the galaxy....",
            director: "George Lucas",
            productor: "Gary Kurtz, Rick McCallum",
            fecha_lanzamiento: "1977-05-25",
            caracteres: [],
            planetas: [],
            naves_estelares: [],
            vehiculos: [],
            especies: [],
            creado: "2014-12-10T14:23:31.880000Z",
            editado: "2014-12-20T19:49:45.256000Z"
        };
        // Mock del servicio
        jest.spyOn(service, 'add').mockImplementation(() => {
            return Promise.resolve(newFilm);
        });
        const result = await controller.add(newFilm);
        expect(service.add).toHaveBeenCalled();
        expect(result.episodio_id).toEqual(newFilm.episodio_id);
    });

    it('Debería manejar un error en listById', async () => {
        const filmId = 7;
        jest.spyOn(apiFilms, 'listById').mockImplementation(() => {
            throw new Error('API Error');
        });
        expect(service.listById(filmId)).rejects.toThrow('API Error');
    });

    it('Debería manejar un error de validación en add', async () => {
        const invalidFilm: FilmRequest = {
            id: 1,
            episodio_id: 1,
            titulo: '',
            rastreo_apertura: "xxxx",
            director: 'xxx',
            productor: 'xxx',
            fecha_lanzamiento: 'xx',
            caracteres: [],
            planetas: [],
            naves_estelares: [],
            vehiculos: [],
            especies: [],
            creado: 'xxx',
            editado: 'xx'
        };
        jest.spyOn(validator, 'validate').mockImplementation(() => {
            throw new Error('campo obligatorio: pelicula.titulo');
        });
        expect(service.add(invalidFilm)).rejects.toThrow('campo obligatorio: pelicula.titulo');
    });


    // Test para verificar que se llama a la función de DynamoDB y a la función de traducción ---
    it('Debería listar todas las películas traducidas al español', async () => {
        const mockDynamoData = [
            { id: 1, data: { titulo: 'Film 1' } },
            { id: 2, data: { titulo: 'Film 2' } },
        ];
        const mockTranslatedData = [
            { id: 1, titulo: 'Película 1' },
            { id: 2, titulo: 'Película 2' },
        ];
    
        jest.spyOn(dynamoRepository, 'listAll').mockResolvedValue(mockDynamoData);
        jest.spyOn(translate, 'filmsToSpanish').mockImplementation((dynamoId, film) => {
            const translatedFilm = mockTranslatedData.find(f => f.id === dynamoId);
            return {
                ...film,
                ...translatedFilm,
                episodio_id: film.episodio_id,
                rastreo_apertura: film.rastreo_apertura,
                director: film.director,
                productor: film.productor,
                fecha_lanzamiento: film.fecha_lanzamiento,
                caracteres: film.caracteres,
                planetas: film.planetas,
                naves_estelares: film.naves_estelares,
                vehiculos: film.vehiculos,
                especies: film.especies,
                creado: film.creado,
                editado: film.editado,
            };

        });
        const result = await service.listall();
        expect(dynamoRepository.listAll).toHaveBeenCalled();
        expect(translate.filmsToSpanish).toHaveBeenCalledTimes(mockDynamoData.length);
        expect(result).toEqual(mockTranslatedData);
    });

    // Test para verificar que se llama a la función de DynamoDB y a la función de traducción al agregar una película
    it('Debería obtener una película por ID, guardarla en DynamoDB y traducirla', async () => {
        const filmId = 1;
        const mockApiResponse = { titulo: 'Film 1' };
        const mockTranslatedFilm = {
            id: filmId,
            episodio_id: 1,
            titulo: 'Película 1',
            rastreo_apertura: 'It is a period of civil war the galaxy....',
            director: 'George Lucas',
            productor: 'Gary Kurtz, Rick McCallum',
            fecha_lanzamiento: '1977-05-25',
            caracteres: [],
            planetas: [],
            naves_estelares: [],
            vehiculos: [],
            especies: [],
            creado: '2014-12-10T14:23:31.880000Z',
            editado: '2014-12-20T19:49:45.256000Z',
        };
    
        jest.spyOn(apiFilms, 'listById').mockResolvedValue(mockApiResponse);
        jest.spyOn(dynamoRepository, 'add').mockResolvedValue();
        jest.spyOn(translate, 'filmsToSpanish').mockReturnValue(mockTranslatedFilm);
    
        const result = await service.listById(filmId);
    
        expect(apiFilms.listById).toHaveBeenCalledWith(filmId);
        expect(dynamoRepository.add).toHaveBeenCalledWith(filmId, mockApiResponse);
        expect(translate.filmsToSpanish).toHaveBeenCalledWith(filmId, mockApiResponse);
        expect(result).toEqual(mockTranslatedFilm);
    });

    
});
import { Test, TestingModule } from '@nestjs/testing';
import { StarwarsController } from '../module/starwars/starwars.controller';
import { StarwarsService } from '../module/starwars/starwars.service';
// import { FilmRequest } from '../src/module/starwars/data/request';
import { TranslateFilmsResponse } from '../module/starwars/data/response';

describe('StarwarsController', () => {
    let controller: StarwarsController;
    let service: StarwarsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StarwarsController],
            providers: [
                {
                    provide: StarwarsService,
                    useValue: {
                        add: jest.fn(),
                        listall: jest.fn(),
                        listById: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<StarwarsController>(StarwarsController);
        service = module.get<StarwarsService>(StarwarsService);
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
        // console.log(result);
        // console.log(expectedResponse);
        expect(service.listall).toHaveBeenCalled();
        expect(result).toEqual(expectedResponse);
    });


    it('Obtener una película por ID', async () => {
        const filmId = 99;
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
        // Mock del servicio
        jest.spyOn(service, 'listById').mockImplementation((_id: number) => {
            return Promise.resolve(responseById);
        });

        const result = await controller.listById(filmId.toString());
        expect(service.listById).toHaveBeenCalled();
        expect(result.episodio_id).toEqual(responseById.episodio_id);
        expect(result.planetas.length).toEqual(responseById.planetas.length);
    });

});
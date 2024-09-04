import { TranslateFilmsResponse } from '../src/module/starwars/data/response';

export const cardMock = (): TranslateFilmsResponse[] =>
    [
        {
            id: 1,
            episodio_id:1,
            titulo:"Anthony Star Wars",
            rastreo_apertura:"xxx",
            director:"xxx",
            productor:"xxx",
            fecha_lanzamiento:"xxx",
            caracteres:"xxx",
            planetas:"xxx",
            naves_estelares:"xxx",
            vehiculos:"xxx",
            especies:"xxx",
            creado:"xxx",
            editado:"xxx"
        },
        {
            id: 2,
            episodio_id:2,
            titulo:"zzz",
            rastreo_apertura:"zzz",
            director:"zzz",
            productor:"zzz",
            fecha_lanzamiento:"zzz",
            caracteres:"zzz",
            planetas:"zzz",
            naves_estelares:"zzz",
            vehiculos:"zzz",
            especies:"zzz",
            creado:"zzz",
            editado:"zzz"
        },
    ]

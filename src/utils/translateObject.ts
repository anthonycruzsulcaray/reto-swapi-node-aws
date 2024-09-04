import { Injectable } from '@nestjs/common';
@Injectable()

export class TranslateObject {

    filmsToSpanish(dynamoId: number, film: any) {
        try {
            const pelicula = {
                id: dynamoId,
                episodio_id: film.episode_id,
                titulo: film.title,
                rastreo_apertura: film.opening_crawl,
                director: film.director,
                productor: film.producer,
                fecha_lanzamiento: film.release_date,
                caracteres: film.characters,
                planetas: film.planets,
                naves_estelares: film.starships,
                vehiculos: film.vehicles,
                especies: film.species,
                creado: film.created,
                editado: film.edited,
            }
            return pelicula;
        } catch (e) {
            throw Error(e)
        }
    }


    filmsToEnglish(dynamoId: number, film: any) {
        try {
            const pelicula = {
                id: dynamoId,
                episode_id: film.episodio_id,
                title: film.titulo,
                opening_crawl: film.rastreo_apertura,
                director: film.director,
                producer: film.productor,
                release_date: film.fecha_lanzamiento,
                characters: film.caracteres,
                planets: film.planetas,
                starships: film.naves_estelares,
                vehicles: film.vehiculos,
                species: film.especies,
                created: film.creado,
                edited: film.editado,
            }
            return pelicula;
        } catch (e) {
            throw Error(e)
        }
    }

}

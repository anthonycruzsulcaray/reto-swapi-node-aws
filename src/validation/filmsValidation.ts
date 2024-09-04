import { Injectable } from "@nestjs/common"

@Injectable()
export default class FilmsValidator {

    validate(pelicula: any) {
        if (!pelicula.titulo || pelicula.titulo.length == "") {
            throw Error("campo obligatorio: pelicula.titulo")
        }
        if (!pelicula.rastreo_apertura || pelicula.rastreo_apertura.length == "") {
            throw Error("campo obligatorio: pelicula.rastreo_apertura")
        }
        if (!pelicula.director || pelicula.director.length == "") {
            throw Error("campo obligatorio: pelicula.director")
        }
        if (!pelicula.productor || pelicula.productor.length == "") {
            throw Error("campo obligatorio: pelicula.productor")
        }
        if (!pelicula.fecha_lanzamiento || pelicula.fecha_lanzamiento.length == "") {
            throw Error("campo obligatorio: pelicula.fecha_lanzamiento")
        }
        if (!pelicula.caracteres || pelicula.caracteres.length == "") {
            throw Error("campo obligatorio: pelicula.caracteres")
        }
        if (!pelicula.planetas || pelicula.planetas.length == "") {
            throw Error("campo obligatorio: pelicula.planetas")
        }
        if (!pelicula.naves_estelares || pelicula.naves_estelares.length == "") {
            throw Error("campo obligatorio: pelicula.naves_estelares")
        }
        if (!pelicula.vehiculos || pelicula.vehiculos.length == "") {
            throw Error("campo obligatorio: pelicula.vehiculos")
        }
        if (!pelicula.especies || pelicula.especies.length == "") {
            throw Error("campo obligatorio: pelicula.especies")
        }

    }
}

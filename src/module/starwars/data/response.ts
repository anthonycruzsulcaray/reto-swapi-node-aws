import { ApiProperty } from "@nestjs/swagger"

export class TranslateFilmsResponse {
    @ApiProperty()
    id: number
    @ApiProperty()
    episodio_id: number
    @ApiProperty()
    titulo: string
    @ApiProperty()
    rastreo_apertura: string
    @ApiProperty()
    director: string
    @ApiProperty()
    productor: string
    @ApiProperty()
    fecha_lanzamiento: string
    @ApiProperty()
    caracteres: string
    @ApiProperty()
    planetas: string
    @ApiProperty()
    naves_estelares: string
    @ApiProperty()
    vehiculos: string
    @ApiProperty()
    especies: string
    @ApiProperty()
    creado: string
    @ApiProperty()
    editado: string
}
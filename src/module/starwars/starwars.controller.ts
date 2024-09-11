import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { StarwarsService } from './starwars.service';
import { FilmRequest } from './data/request';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TranslateFilmsResponse } from './data/response';

@ApiTags('peliculas')
@Controller('starwars')
export class StarwarsController {
  constructor(private readonly starwarsService: StarwarsService) { }

  @Get('films')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obtener todas las películas' })
  @ApiResponse({ status: 200, description: 'Devuelve todas las películas.' })
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async listAll(): Promise<TranslateFilmsResponse[]> {
    return await this.starwarsService.listall();
  }

  @Get('films/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obtener una película por ID' })
  @ApiParam({ name: 'id', description: 'ID de la película' })
  @ApiResponse({ status: 200, description: 'Devuelve una película.' })
  async listById(@Param('id') id: string): Promise<TranslateFilmsResponse> {
    return await this.starwarsService.listById(+id);
  }

  @Post('films')
  @HttpCode(201)
  @ApiOperation({ summary: 'Crear una nueva película' })
  @ApiResponse({ status: 201, description: 'La película ha sido creada.' })
  async add(@Body() requestBody: FilmRequest): Promise<TranslateFilmsResponse> {
    return await this.starwarsService.add(requestBody);
  }


}

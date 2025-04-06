import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { StarwarsService } from './starwars.service';
import { FilmRequest } from './data/request';
import { TranslateFilmsResponse } from './data/response';

@Controller('starwars')
export class StarwarsController {
  constructor(private readonly starwarsService: StarwarsService) { }

  @Get('films')
  @HttpCode(200)
  async listAll(): Promise<TranslateFilmsResponse[]> {
    return await this.starwarsService.listall();
  }

  @Get('films/:id')
  @HttpCode(200)
  async listById(@Param('id') id: string): Promise<TranslateFilmsResponse> {
    return await this.starwarsService.listById(+id);
  }

  @Post('films')
  @HttpCode(201)
  async add(@Body() requestBody: FilmRequest): Promise<TranslateFilmsResponse> {
    return await this.starwarsService.add(requestBody);
  }


}

import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { StarwarsService } from './starwars.service';

@Controller('starwars')
export class StarwarsController {
  constructor(private readonly starwarsService: StarwarsService) {}

  @Get(':id')
  @HttpCode(200)
  async getCharacter(@Param('id') id: string) {
    return await this.starwarsService.getCharacter(id);
  }

  @Get()
  @HttpCode(200)
  async getCharacters() {
    return await this.starwarsService.getCharactersFromDynamoDB();
  }
  


}

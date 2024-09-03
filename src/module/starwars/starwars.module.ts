import { Module } from '@nestjs/common';
import { StarwarsService } from './starwars.service';
import { StarwarsController } from './starwars.controller';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [StarwarsController],
  providers: [StarwarsService]
})
export class StarwarsModule {}

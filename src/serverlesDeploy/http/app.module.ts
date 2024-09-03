import { Module } from '@nestjs/common';
import { StarwarsModule } from '../../module/starwars/starwars.module';

@Module({
  imports: [StarwarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './database.provider';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  providers: [],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}

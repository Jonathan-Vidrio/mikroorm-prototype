import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DatabaseProvider } from './database.provider';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useClass: DatabaseProvider,
    }),
  ],
  providers: [],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}

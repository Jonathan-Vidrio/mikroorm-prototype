import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Author } from './entities/author.entity';
import { Status } from '../status/entities/status.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Author, Status])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}

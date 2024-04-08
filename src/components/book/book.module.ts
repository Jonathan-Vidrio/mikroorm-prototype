import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';
import { Category } from '../category/entities/category.entity';
import { Editorial } from '../editorial/entities/editorial.entity';
import { Language } from '../language/entities/language.entity';
import { Status } from '../status/entities/status.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Book,
      Author,
      Category,
      Editorial,
      Language,
      Status,
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}

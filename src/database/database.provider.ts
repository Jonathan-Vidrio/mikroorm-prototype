import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs';
import { MySqlDriver } from '@mikro-orm/mysql';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Language } from '../components/language/entities/language.entity';
import { Status } from '../components/status/entities/status.entity';
import { Book } from '../components/book/entities/book.entity';
import { Author } from '../components/author/entities/author.entity';
import { Category } from '../components/category/entities/category.entity';
import { Editorial } from '../components/editorial/entities/editorial.entity';

@Injectable()
export class DatabaseProvider implements MikroOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMikroOrmOptions(): MikroOrmModuleOptions {
    return {
      entities: [Author, Book, Category, Editorial, Language, Status],
      entitiesTs: [Author, Book, Category, Editorial, Language, Status],
      driver: MySqlDriver,
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      dbName: this.configService.get<string>('DB_DATABASE'),
      user: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      debug: this.configService.get<boolean>('DB_DEBUG'),
    };
  }
}

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorModule } from './components/author/author.module';
import { BookModule } from './components/book/book.module';
import { CategoryModule } from './components/category/category.module';
import { EditorialModule } from './components/editorial/editorial.module';
import { LanguageModule } from './components/language/language.module';
import { StatusModule } from './components/status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthorModule,
    BookModule,
    CategoryModule,
    EditorialModule,
    LanguageModule,
    StatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

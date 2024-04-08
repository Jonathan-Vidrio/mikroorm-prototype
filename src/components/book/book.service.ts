import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Book } from './entities/book.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Status } from '../status/entities/status.entity';
import { Author } from '../author/entities/author.entity';
import { Category } from '../category/entities/category.entity';
import { Editorial } from '../editorial/entities/editorial.entity';
import { Language } from '../language/entities/language.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: EntityRepository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: EntityRepository<Author>,
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    @InjectRepository(Editorial)
    private readonly editorialRepository: EntityRepository<Editorial>,
    @InjectRepository(Language)
    private readonly languageRepository: EntityRepository<Language>,
    @InjectRepository(Status)
    private readonly statusRepository: EntityRepository<Status>,
    private readonly em: EntityManager,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create({
      ...createBookDto,
      Author: await this.authorRepository.findOne({
        Id: createBookDto.AuthorId,
      }),
      Editorial: await this.editorialRepository.findOne({
        Id: createBookDto.EditorialId,
      }),
      Category: await this.categoryRepository.findOne({
        Id: createBookDto.CategoryId,
      }),
      Language: await this.languageRepository.findOne({
        Id: createBookDto.LanguageId,
      }),
      updatedAt: new Date(),
    });

    if (createBookDto.StatusId) {
      book.Status = await this.statusRepository.findOne({
        Id: createBookDto.StatusId,
      });
    }

    await this.em.persistAndFlush(book);

    return await this.findOne(book.Id);
  }

  async findAll(): Promise<Book[]> {
    const books = await this.bookRepository.findAll({
      populate: ['Author', 'Editorial', 'Category', 'Language', 'Status'],
    });

    return books.map((book) => ({
      Id: book.Id,
      ISBN: book.ISBN,
      Title: book.Title,
      Subtitle: book.Subtitle,
      PublishDate: book.PublishDate,
      Pages: book.Pages,
      Description: book.Description,
      Author: book.Author,
      Editorial: book.Editorial,
      Category: book.Category,
      Language: book.Language,
      Status: book.Status,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    }));
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne(
      { Id: id },
      { populate: ['Author', 'Editorial', 'Category', 'Language', 'Status'] },
    );

    return {
      Id: book.Id,
      ISBN: book.ISBN,
      Title: book.Title,
      Subtitle: book.Subtitle,
      PublishDate: book.PublishDate,
      Pages: book.Pages,
      Description: book.Description,
      Author: book.Author,
      Editorial: book.Editorial,
      Category: book.Category,
      Language: book.Language,
      Status: book.Status,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (book) {
      if (updateBookDto.AuthorId) {
        book.Author = await this.authorRepository.findOne({
          Id: updateBookDto.AuthorId,
        });
      }

      if (updateBookDto.EditorialId) {
        book.Editorial = await this.editorialRepository.findOne({
          Id: updateBookDto.EditorialId,
        });
      }

      if (updateBookDto.CategoryId) {
        book.Category = await this.categoryRepository.findOne({
          Id: updateBookDto.CategoryId,
        });
      }

      if (updateBookDto.LanguageId) {
        book.Language = await this.languageRepository.findOne({
          Id: updateBookDto.LanguageId,
        });
      }

      if (updateBookDto.StatusId) {
        book.Status = await this.statusRepository.findOne({
          Id: updateBookDto.StatusId,
        });
      }

      this.bookRepository.assign(book, updateBookDto);
      await this.em.persistAndFlush(book);

      return book;
    }
  }

  async remove(id: number): Promise<Book> {
    const book = await this.findOne(id);

    if (book) {
      await this.em.removeAndFlush(book);

      return book;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: EntityRepository<Author>,
    @InjectRepository(Status)
    private readonly statusRepository: EntityRepository<Status>,
    private readonly em: EntityManager,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create({
      ...createAuthorDto,
      updatedAt: new Date(),
    });
    await this.em.persistAndFlush(author);

    return await this.findOne(author.Id);
  }

  async findAll(): Promise<Author[]> {
    const authors = await this.authorRepository.findAll({
      populate: ['Status'],
    });

    return authors.map((author) => ({
      Id: author.Id,
      FirstName: author.FirstName,
      LastName: author.LastName,
      Pseudonym: author.Pseudonym,
      BirthDate: author.BirthDate,
      Nationality: author.Nationality,
      Status: author.Status,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    }));
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne(
      { Id: id },
      { populate: ['Status'] },
    );

    return {
      Id: author.Id,
      FirstName: author.FirstName,
      LastName: author.LastName,
      Pseudonym: author.Pseudonym,
      BirthDate: author.BirthDate,
      Nationality: author.Nationality,
      Status: author.Status,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    };
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);

    if (author) {
      if (updateAuthorDto.StatusId) {
        author.Status = await this.statusRepository.findOne({
          Id: updateAuthorDto.StatusId,
        });
      }

      this.authorRepository.assign(author, updateAuthorDto);
      await this.em.persistAndFlush(author);

      return author;
    }
  }

  async remove(id: number): Promise<Author> {
    const author = await this.findOne(id);

    if (author) {
      await this.em.removeAndFlush(author);

      return author;
    }
  }
}

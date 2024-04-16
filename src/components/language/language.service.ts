import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Language } from './entities/language.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: EntityRepository<Language>,
    @InjectRepository(Status)
    private readonly statusRepository: EntityRepository<Status>,
    private readonly em: EntityManager,
  ) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const language = this.languageRepository.create({
      ...createLanguageDto,
      updatedAt: new Date(),
    });

    await this.em.persistAndFlush(language);

    return language;
  }

  async findAll(): Promise<Language[]> {
    return await this.languageRepository.findAll({
      populate: ['Status', 'Books'],
    });
  }

  async findOne(id: number): Promise<Language> {
    return await this.languageRepository.findOne(
      { Id: id },
      { populate: ['Status', 'Books'] },
    );
  }

  async update(
    id: number,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<Language> {
    const language = await this.languageRepository.findOne({ Id: id });

    if (language) {
      if (updateLanguageDto.StatusId) {
        language.Status = await this.statusRepository.findOne({
          Id: updateLanguageDto.StatusId,
        });
      }

      this.languageRepository.assign(language, updateLanguageDto);
      await this.em.persistAndFlush(language);

      return language;
    }
  }

  async remove(id: number): Promise<Language> {
    const language = await this.languageRepository.findOne({ Id: id });

    if (language) {
      await this.em.removeAndFlush(language);

      return language;
    }
  }
}

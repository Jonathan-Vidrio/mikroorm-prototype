import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Category } from './entities/category.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    @InjectRepository(Status)
    private readonly statusRepository: EntityRepository<Status>,
    private readonly em: EntityManager,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      updatedAt: new Date(),
    });

    await this.em.persistAndFlush(category);

    return category;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll({
      populate: ['Status', 'Books'],
    });
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOne(
      { Id: id },
      { populate: ['Status', 'Books'] },
    );
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({ Id: id });

    if (category) {
      if (updateCategoryDto.StatusId) {
        category.Status = await this.statusRepository.findOne({
          Id: updateCategoryDto.StatusId,
        });
      }

      this.categoryRepository.assign(category, updateCategoryDto);
      await this.em.persistAndFlush(category);

      return category;
    }
  }

  async remove(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ Id: id });

    if (category) {
      await this.em.removeAndFlush(category);

      return category;
    }
  }
}

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

    return await this.findOne(category.Id);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll({
      populate: ['Status'],
    });

    return categories.map((category) => ({
      Id: category.Id,
      Name: category.Name,
      Description: category.Description,
      Status: category.Status,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(
      { Id: id },
      { populate: ['Status'] },
    );

    return {
      Id: category.Id,
      Name: category.Name,
      Description: category.Description,
      Status: category.Status,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

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
    const category = await this.findOne(id);

    if (category) {
      await this.em.removeAndFlush(category);

      return category;
    }
  }
}

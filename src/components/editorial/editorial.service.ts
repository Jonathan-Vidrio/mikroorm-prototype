import { Injectable } from '@nestjs/common';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Editorial } from './entities/editorial.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class EditorialService {
  constructor(
    @InjectRepository(Editorial)
    private readonly editorialRepository: EntityRepository<Editorial>,
    @InjectRepository(Status)
    private readonly statusRepository: EntityRepository<Status>,
    private readonly em: EntityManager,
  ) {}

  async create(createEditorialDto: CreateEditorialDto): Promise<Editorial> {
    const editorial = this.editorialRepository.create({
      ...createEditorialDto,
      updatedAt: new Date(),
    });
    await this.em.persistAndFlush(editorial);

    return await this.findOne(editorial.Id);
  }

  async findAll(): Promise<Editorial[]> {
    const editorials = await this.editorialRepository.findAll({
      populate: ['Status'],
    });

    return editorials.map((editorial) => ({
      Id: editorial.Id,
      Name: editorial.Name,
      Address: editorial.Address,
      Phone: editorial.Phone,
      Email: editorial.Email,
      Website: editorial.Website,
      Status: editorial.Status,
      createdAt: editorial.createdAt,
      updatedAt: editorial.updatedAt,
    }));
  }

  async findOne(id: number): Promise<Editorial> {
    const editorial = await this.editorialRepository.findOne(
      { Id: id },
      { populate: ['Status'] },
    );

    return {
      Id: editorial.Id,
      Name: editorial.Name,
      Address: editorial.Address,
      Phone: editorial.Phone,
      Email: editorial.Email,
      Website: editorial.Website,
      Status: editorial.Status,
      createdAt: editorial.createdAt,
      updatedAt: editorial.updatedAt,
    };
  }

  async update(
    id: number,
    updateEditorialDto: UpdateEditorialDto,
  ): Promise<Editorial> {
    const editorial = await this.findOne(id);

    if (editorial) {
      if (updateEditorialDto.StatusId) {
        editorial.Status = await this.statusRepository.findOne({
          Id: updateEditorialDto.StatusId,
        });
      }

      this.editorialRepository.assign(editorial, updateEditorialDto);
      await this.em.persistAndFlush(editorial);

      return editorial;
    }
  }

  async remove(id: number): Promise<Editorial> {
    const editorial = await this.findOne(id);

    if (editorial) {
      await this.em.removeAndFlush(editorial);

      return editorial;
    }
  }
}

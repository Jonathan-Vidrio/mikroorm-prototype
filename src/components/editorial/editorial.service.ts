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

    return editorial;
  }

  async findAll(): Promise<Editorial[]> {
    return await this.editorialRepository.findAll({
      populate: ['Status', 'Books'],
    });
  }

  async findOne(id: number): Promise<Editorial> {
    return await this.editorialRepository.findOne(
      { Id: id },
      { populate: ['Status'] },
    );
  }

  async update(
    id: number,
    updateEditorialDto: UpdateEditorialDto,
  ): Promise<Editorial> {
    const editorial = await this.editorialRepository.findOne({ Id: id });

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
    const editorial = await this.editorialRepository.findOne({ Id: id });

    if (editorial) {
      await this.em.removeAndFlush(editorial);

      return editorial;
    }
  }
}

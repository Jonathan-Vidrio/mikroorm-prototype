import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Status } from './entities/status.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: EntityRepository<Status>,
    private readonly em: EntityManager,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const status = this.statusRepository.create({
      ...createStatusDto,
      updatedAt: new Date(),
    });
    await this.em.persistAndFlush(status);

    return this.findOne(status.Id);
  }

  async findAll(): Promise<Status[]> {
    const statuses = await this.statusRepository.findAll();

    return statuses.map((status) => ({
      Id: status.Id,
      Name: status.Name,
      Description: status.Description,
      createdAt: status.createdAt,
      updatedAt: status.updatedAt,
    }));
  }

  async findOne(id: number): Promise<Status> {
    const status = await this.statusRepository.findOne({ Id: id });

    return {
      Id: status.Id,
      Name: status.Name,
      Description: status.Description,
      createdAt: status.createdAt,
      updatedAt: status.updatedAt,
    };
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.findOne(id);

    if (status) {
      this.statusRepository.assign(status, updateStatusDto);
      await this.em.persistAndFlush(status);

      return status;
    }
  }

  async remove(id: number): Promise<Status> {
    const status = await this.findOne(id);

    if (status) {
      await this.em.removeAndFlush(status);

      return status;
    }
  }
}

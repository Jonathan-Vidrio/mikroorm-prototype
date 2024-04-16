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

    return status;
  }

  async findAll(): Promise<Status[]> {
    return await this.statusRepository.findAll({ populate: ['Books'] });
  }

  async findOne(id: number): Promise<Status> {
    return await this.statusRepository.findOne(
      { Id: id },
      { populate: ['Books'] },
    );
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.statusRepository.findOne({ Id: id });

    if (status) {
      Object.assign(status, updateStatusDto);
      await this.em.persistAndFlush(status);

      return status;
    }
  }

  async remove(id: number): Promise<Status> {
    const status = await this.statusRepository.findOne({ Id: id });

    if (status) {
      await this.em.removeAndFlush(status);

      return status;
    }
  }
}

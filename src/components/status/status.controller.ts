import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async create(@Body() createStatusDto: CreateStatusDto): Promise<Status> {
    return await this.statusService.create(createStatusDto);
  }

  @Get()
  async findAll(): Promise<Status[]> {
    return await this.statusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Status> {
    return await this.statusService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Status> {
    return await this.statusService.update(+id, updateStatusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Status> {
    return await this.statusService.remove(+id);
  }
}

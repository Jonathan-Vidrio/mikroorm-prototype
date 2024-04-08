import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Status } from './entities/status.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Status])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}

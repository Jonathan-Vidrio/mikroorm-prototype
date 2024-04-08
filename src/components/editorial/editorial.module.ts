import { Module } from '@nestjs/common';
import { EditorialService } from './editorial.service';
import { EditorialController } from './editorial.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Editorial } from './entities/editorial.entity';
import { Status } from '../status/entities/status.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Editorial, Status])],
  controllers: [EditorialController],
  providers: [EditorialService],
})
export class EditorialModule {}

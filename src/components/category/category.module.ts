import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Category } from './entities/category.entity';
import { Status } from '../status/entities/status.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Category, Status])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  readonly Id?: number;
  readonly Name?: string;
  readonly Description?: string;
  readonly StatusId?: number;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateEditorialDto } from './create-editorial.dto';

export class UpdateEditorialDto extends PartialType(CreateEditorialDto) {
  readonly Id?: number;
  readonly Name?: string;
  readonly Address?: string;
  readonly Phone?: string;
  readonly Email?: string;
  readonly Website?: string;
  readonly StatusId?: number;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  readonly Id?: number;
  readonly FirstName?: string;
  readonly LastName?: string;
  readonly Pseudonym?: string;
  readonly BirthDate?: Date;
  readonly Nationality?: string;
  readonly StatusId?: number;
}

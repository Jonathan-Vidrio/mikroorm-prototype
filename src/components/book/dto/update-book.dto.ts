import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  readonly Id?: number;
  readonly ISBN?: string;
  readonly Title?: string;
  readonly Subtitle?: string;
  readonly PublishDate?: Date;
  readonly Pages?: number;
  readonly Description?: string;
  readonly AuthorId?: number;
  readonly EditorialId?: number;
  readonly CategoryId?: number;
  readonly LanguageId?: number;
  readonly StatusId?: number;
}

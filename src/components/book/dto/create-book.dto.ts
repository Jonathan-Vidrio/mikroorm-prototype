export class CreateBookDto {
  readonly Id?: number;
  readonly ISBN: string;
  readonly Title: string;
  readonly Subtitle: string;
  readonly PublishDate: Date;
  readonly Pages: number;
  readonly Description: string;
  readonly AuthorId: number;
  readonly CategoryId: number;
  readonly EditorialId: number;
  readonly LanguageId: number;
  readonly StatusId?: number;
}

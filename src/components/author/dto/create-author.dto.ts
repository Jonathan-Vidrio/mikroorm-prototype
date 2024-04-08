export class CreateAuthorDto {
  readonly Id?: number;
  readonly FirstName: string;
  readonly LastName: string;
  readonly Pseudonym: string;
  readonly BirthDate: Date;
  readonly Nationality: string;
  readonly StatusId?: number;
}

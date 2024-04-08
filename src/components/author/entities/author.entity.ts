import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Status } from '../../status/entities/status.entity';
import { Book } from '../../book/entities/book.entity';

@Entity({ tableName: 'Authors' })
export class Author {
  @PrimaryKey({ fieldName: 'Id', autoincrement: true })
  Id!: number;

  @Property({ fieldName: 'FirstName', nullable: false })
  FirstName!: string;

  @Property({ fieldName: 'LastName', nullable: false })
  LastName!: string;

  @Property({ fieldName: 'Pseudonym', unique: true, nullable: false })
  Pseudonym!: string;

  @Property({ fieldName: 'BirthDate', nullable: false })
  BirthDate!: Date;

  @Property({ fieldName: 'Nationality', nullable: false })
  Nationality!: string;

  @ManyToOne(() => Status, {
    fieldName: 'StatusId',
    nullable: false,
    default: 1,
  })
  Status!: Status;

  @Property({
    fieldName: 'createdAt',
    onCreate: () => new Date(),
    nullable: false,
  })
  createdAt: Date;

  @Property({
    fieldName: 'updatedAt',
    onUpdate: () => new Date(),
    nullable: false,
  })
  updatedAt: Date;

  @OneToMany(() => Book, (book) => book.Author)
  Books? = new Collection<Book>(this);
}

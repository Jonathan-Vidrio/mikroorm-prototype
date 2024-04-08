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

@Entity({ tableName: 'Languages' })
export class Language {
  @PrimaryKey({ fieldName: 'Id', autoincrement: true })
  Id!: number;

  @Property({ fieldName: 'Name', unique: true, nullable: false })
  Name!: string;

  @Property({ fieldName: 'Description', nullable: false })
  Description!: string;

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

  @OneToMany(() => Book, (book) => book.Language)
  Books? = new Collection<Book>(this);
}

import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { VehicleType } from '../../../utils/enum/vehicle-type.enum';
import { Department } from '../../../utils/enum/department.enum';
import { Status } from '../../../utils/enum/status.enum';

@Entity({ tableName: 'Vehicles' })
export class Vehicle {
  @PrimaryKey({ fieldName: 'Id', autoincrement: true })
  Id!: number;

  @Property({ fieldName: 'LicensePlates', unique: true })
  LicensePlates!: string;

  @Property({ fieldName: 'Image' })
  Image!: string;

  @Enum({
    fieldName: 'VehicleType',
    items: () => VehicleType,
  })
  VehicleType!: VehicleType;

  @Property({ fieldName: 'Brand' })
  Brand!: string;

  @Property({ fieldName: 'Model' })
  Model!: string;

  @Property({ fieldName: 'SerialNumber', unique: true })
  SerialNumber!: string;

  @Property({ fieldName: 'Color' })
  Color!: string;

  @Enum({ fieldName: 'Department', items: () => Department })
  Department!: Department;

  @Enum({ fieldName: 'Status', items: () => Status })
  Status: Status = Status.ACTIVE;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}

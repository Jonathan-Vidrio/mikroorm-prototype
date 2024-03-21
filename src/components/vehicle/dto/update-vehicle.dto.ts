import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { VehicleType } from '../../../utils/enum/vehicle-type.enum';
import { Department } from '../../../utils/enum/department.enum';
import { Status } from '../../../utils/enum/status.enum';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  readonly Id?: number;
  readonly LicensePlates?: string;
  readonly Image?: string;
  readonly VehicleType?: VehicleType;
  readonly Brand?: string;
  readonly Model?: string;
  readonly SerialNumber?: string;
  readonly Color?: string;
  readonly Department?: Department;
  readonly Status?: Status;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

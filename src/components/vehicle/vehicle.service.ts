import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Vehicle } from './entities/vehicle.entity';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: EntityRepository<Vehicle>,
  ) {}
  create(createVehicleDto: CreateVehicleDto) {
    return this.vehicleRepository.insert(createVehicleDto);
  }

  findAll() {
    return this.vehicleRepository.findAll();
  }

  findOne(id: number) {
    return this.vehicleRepository.findOne({ Id: id });
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleRepository.nativeUpdate({ Id: id }, updateVehicleDto);
  }

  remove(id: number) {
    return this.vehicleRepository.nativeDelete({ Id: id });
  }
}

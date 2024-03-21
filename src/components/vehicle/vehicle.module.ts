import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}

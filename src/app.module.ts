import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './components/vehicle/vehicle.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

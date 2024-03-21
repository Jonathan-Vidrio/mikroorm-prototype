import { MySqlDriver } from '@mikro-orm/mysql';
import { Vehicle } from '../components/vehicle/entities/vehicle.entity';

export default {
  entities: [Vehicle],
  entitiesTs: [Vehicle],
  driver: MySqlDriver,
  host: 'localhost',
  port: 3306,
  dbName: 'test',
  user: 'test',
  password: 'test',
  debug: true,
};

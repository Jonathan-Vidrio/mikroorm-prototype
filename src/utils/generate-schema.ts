import { MikroORM } from '@mikro-orm/core';
import { DatabaseProvider } from '../database/database.provider';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

(async () => {
  const env = dotenv.config().parsed;

  const configService = new ConfigService(env);

  const databaseProvider = new DatabaseProvider(configService);

  const mikroOrmOptions = databaseProvider.createMikroOrmOptions();

  const orm = await MikroORM.init(mikroOrmOptions);

  const generator = orm.getSchemaGenerator();
  await generator.createSchema();

  await orm.close(true);
})();

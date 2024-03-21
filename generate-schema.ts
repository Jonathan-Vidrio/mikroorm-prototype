import { MikroORM } from '@mikro-orm/core';
import config from './src/database/database.provider';

(async () => {
  const orm = await MikroORM.init(config);
  const generator = orm.getSchemaGenerator();

  // Genera y ejecuta las consultas SQL para crear el esquema
  await generator.createSchema();

  await orm.close(true);
})();

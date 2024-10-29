import knex, { Knex } from 'knex';

interface conectionDatabase {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}
const dbConfig: conectionDatabase = {
  host: 'localhost',
  user: 'admin',
  password: '12345',
  database: 'social_database',
  port: 5432,
};
const knexConfig: Knex.Config = {
  client: 'pg',
  connection: dbConfig,
};

export default knex(knexConfig);

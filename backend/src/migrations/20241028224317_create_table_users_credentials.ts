import type { Knex } from 'knex';
import { exit } from 'process';

export async function up(knex: Knex): Promise<void> {
  const exits = await knex.schema.hasTable('users_credentials');
  if (!exits) {
    await knex.schema.createTable('users_credentials', (table) => {
      table.increments('id').primary().unique().notNullable();
      table.string('user_name').notNullable();
      table.string('password').notNullable();
      table.integer('person_id').unsigned().notNullable();
      table.foreign('person_id').references('id').inTable('persons');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('users_credentials');
  if (exist) {
    await knex.schema.dropTable('users_credentials');
  }
}

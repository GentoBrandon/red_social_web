import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exits = await knex.schema.hasTable('users');
  if (!exits) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table
        .integer('users_credentiasl_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users_credentials')
        .onDelete('CASCADE');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('users');
  if (exist) {
    await knex.schema.dropTable('users');
  }
}

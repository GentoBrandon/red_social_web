import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('friends_status');
  if (!exist) {
    return knex.schema.createTable('friends_status', (table) => {
      table.increments('id').primary();
      table.string('name_status').notNullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('friends_status');
  if (exist) {
    return knex.schema.dropTable('friends_status');
  }
}

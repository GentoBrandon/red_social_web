import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('request_friends');
  if (!exist) {
    await knex.schema.createTable('request_friends', (table) => {
      table.increments('id').primary();
      table.integer('id_profile_request').unsigned().notNullable();
      table.integer('id_profile_response').unsigned().notNullable();
      table.integer('id_status').unsigned().notNullable();
      table
        .foreign('id_profile_request')
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE');
      table
        .foreign('id_profile_response')
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE');
      table.foreign('id_status').references('id').inTable('friends_status');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('request_friends');
  if (exist) {
    await knex.schema.dropTable('request_friends');
  }
}

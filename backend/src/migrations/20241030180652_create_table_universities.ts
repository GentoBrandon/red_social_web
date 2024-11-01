import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('universities');
  if (!exist) {
    await knex.schema.createTable('universities', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exits = await knex.schema.hasTable('universities');
  if (exits) {
    await knex.schema.dropTable('universities');
  }
}

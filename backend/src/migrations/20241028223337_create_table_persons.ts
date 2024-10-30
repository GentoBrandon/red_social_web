import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('persons');
  if (!exist) {
    await knex.schema.createTable('persons', (table) => {
      table.increments('id').primary().unique().notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.date('birth_date').notNullable();
      table.string('email').unique().notNullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('persons');
  if (exist) {
    await knex.schema.dropTable('persons');
  }
}

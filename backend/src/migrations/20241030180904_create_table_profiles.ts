import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('profiles');
  if (!exist) {
    await knex.schema.createTable('profiles', (table) => {
      table.increments('id').primary();
      table.integer('person_id').unsigned().notNullable();
      table.string('presentation');
      table.string('address');
      table.string('phone_number');
      table.string('job');
      table.string('university');
      table
        .foreign('person_id')
        .references('id')
        .inTable('persons')
        .onDelete('CASCADE');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('profiles');
  if (exist) {
    await knex.schema.dropTable('profiles');
  }
}

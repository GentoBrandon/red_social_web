import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('posts');
  if (!exist) {
    await knex.schema.createTable('posts', (table) => {
      table.increments('id').primary();
      table.integer('id_profile').unsigned().notNullable();
      table.string('description');
      table.string('content');
      table.timestamp('date').defaultTo(knex.fn.now());
      table
        .foreign('id_profile')
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('posts');
    if(exist){
        await knex.schema.dropTable('posts');
    }
}


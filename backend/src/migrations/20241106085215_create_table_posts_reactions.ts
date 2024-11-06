import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('post_reactions');
    if (!exist) {
      await knex.schema.createTable('post_reactions', (table) => {
        table.increments('id').primary();
        table.integer('id_profile').unsigned().notNullable();
        table.integer('id_post').unsigned().notNullable();
        table.boolean('reactions');
        table.timestamp('date').defaultTo(knex.fn.now());
        table
          .foreign('id_profile')
          .references('id')
          .inTable('profiles')
          .onDelete('CASCADE');
       table
          .foreign('id_post')
          .references('id')
          .inTable('posts')
          .onDelete('CASCADE');
      });
    }
}


export async function down(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('post_reactions');
    if(exist){
        await knex.schema.dropTable('post_reactions');
    }
}


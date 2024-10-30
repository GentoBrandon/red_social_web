import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('jobs');
    if(!exist){
        await knex.schema.createTable('jobs', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
    })
    }
}


export async function down(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('jobs');
    if(exist){
        await knex.schema.dropTable('jobs');
    }
}


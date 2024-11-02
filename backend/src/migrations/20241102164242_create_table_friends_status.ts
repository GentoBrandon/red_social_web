import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('friends_status');
    if(!exist){
        await knex.schema.createTable('friends_status', table => {
            table.increments('id').primary();
            table.string('name_status');
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('friends_status');
    if(exist){
        await knex.schema.dropTable('friends_status');
    }
}


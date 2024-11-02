import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('friends');

    if(!exist){
        await knex.schema.createTable('friends', table => {
            table.increments('id').primary();
            table.integer('profile_request_id').unsigned().notNullable();
            table.integer('profile_receiver_id').unsigned().notNullable();
            table.integer('status_id').unsigned().notNullable();
            table.foreign('profile_request_id').references('id').inTable('profiles').onDelete('CASCADE');
            table.foreign('profile_receiver_id').references('id').inTable('profiles').onDelete('CASCADE');
            table.foreign('status_id').references('id').inTable('friends_status');
        });
    }
}



export async function down(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('friends');

    if(exist){
        await knex.schema.dropTable('friends');
    }   
}


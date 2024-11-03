import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable('friends');
    if(!hasTable) {
        return knex.schema.createTable('friends', table => {
            table.increments('id').primary();
            table.integer('request_friend_id').unsigned().notNullable();
            table.foreign('request_friend_id').references('id').inTable('request_friends');
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('friends');
    if(exist) {
        return knex.schema.dropTable('friends');
    }
}


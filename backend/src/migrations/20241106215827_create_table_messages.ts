import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('messages');
    if(!exist){
        await knex.schema.createTable('messages', (table) => {
            table.increments('id').primary();
            table.integer('room_id').notNullable().references('id').inTable('rooms').onDelete('CASCADE');
            table.integer('profile_id').notNullable().references('id').inTable('profiles').onDelete('CASCADE');
            table.text('content').notNullable();
            table.timestamp('created').defaultTo(knex.fn.now());
        });

    }
   
}


export async function down(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('messages')
    if(exist){
        await knex.schema.dropTableIfExists('messages');
    }
}


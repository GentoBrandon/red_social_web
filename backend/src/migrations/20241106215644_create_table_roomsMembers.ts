import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('room_members');
    if(!exist){
        await knex.schema.createTable('room_members', (table) => {
            table.increments('id').primary();
            table.integer('room_id').notNullable().references('id').inTable('rooms').onDelete('CASCADE');
            table.integer('profile_id').notNullable().references('id').inTable('profiles').onDelete('CASCADE');
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('room_members');
    if(exist){
        await knex.schema.dropTable('room_members')
    }
}


import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable('rooms');
    if(!exists){
        await knex.schema.createTable('rooms',(table)=>{
            table.increments('id').primary();
            table.string('name');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('rooms');
    if(exist){
        await knex.schema.dropTable('rooms');
    }
}


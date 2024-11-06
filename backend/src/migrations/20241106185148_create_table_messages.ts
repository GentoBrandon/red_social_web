import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> { 
    const exist = await knex.schema.hasTable('messages');
    if (!exist) {
        await knex.schema.createTable('messages', (table) => {
            table.increments('id').primary().unique().notNullable();
            table.string('content'); // Contenido del mensaje
            table.timestamp('created').defaultTo(knex.fn.now()); // Fecha de creación del mensaje
            table.integer('user_id').notNullable(); // ID del usuario que envía el mensaje
           
             // Definir las relaciones de clave foránea
             table.foreign('user_id').references('id').inTable('profiles').onDelete('CASCADE');
          

        });
      }
}


export async function down(knex: Knex): Promise<void> {
     const exist = await knex.schema.hasTable('messages');
    if (exist) {
        await knex.schema.dropTable('messages');
    }
}


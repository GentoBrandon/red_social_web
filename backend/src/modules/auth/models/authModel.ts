import db from "../../../config/dbConfig";
interface Person {
    first_name: string;
    last_name: string;
    birth_date: Date;
    email: string;
  }
  interface UserCredential{
    
    user_name: string,
    password: string,
  }

export default class AuthModel {
    static async insertQwithTransaction(person: Person, user_credential: UserCredential) {
        try {
            // Inicia la transacción
            const result = await db.transaction(async trx => {
                // Insertar en la tabla 'person'
                const resultInsertPerson = await trx('persons').insert(person).returning('id');
                if (!resultInsertPerson || resultInsertPerson.length === 0) {
                    throw new Error("Failed to insert person");
                }
    
                // Insertar en la tabla 'user_credentials' usando el id retornado de 'person'
                const resultInsertUserCredential = await trx('users_credentials').insert({
                    ...user_credential,
                    person_id: resultInsertPerson[0].id // Usa resultInsertPerson[0].id si devuelve un objeto
                });
    
                // Retorna el resultado de ambas inserciones si ambas tienen éxito
                return {
                    success: true,
                    person_id: resultInsertPerson[0].id
                };
            });
    
            return result; // Retorna resultado exitoso fuera de la transacción
        } catch (error) {
            // Manejo de errores
            console.error("Transaction failed:", error);
            throw {
                success: false,
                message: (error as Error).message,
                stack: (error as Error).stack
            };
        }
    }
}
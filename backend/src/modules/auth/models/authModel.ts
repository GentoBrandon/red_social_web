import db from '../../../config/dbConfig';
interface Person {
  first_name: string;
  last_name: string;
  birth_date: Date;
  email: string;
}
interface UserCredential {
  user_name: string;
}
interface Credentials {
  person_id: number;
  user_name: string;
}

export default class AuthModel {
  static async insertQwithTransaction(
    person: Person,
    user_credential: UserCredential,
  ) {
    try {
      // Inicia la transacción
      const result = await db.transaction(async (trx) => {
        // Insertar en la tabla 'person'
        const resultInsertPerson = await trx('persons')
          .insert(person)
          .returning('id');
        if (!resultInsertPerson || resultInsertPerson.length === 0) {
          throw new Error('Failed to insert person');
        }

        // Insertar en la tabla 'user_credentials' usando el id retornado de 'person'
        const resultInsertUserCredential = await trx(
          'users_credentials',
        ).insert({
          ...user_credential,
          person_id: resultInsertPerson[0].id, // Usa resultInsertPerson[0].id si devuelve un objeto
        });

        // Retorna el resultado de ambas inserciones si ambas tienen éxito
        return {
          success: true,
          person_id: resultInsertPerson[0].id,
        };
      });

      return result; // Retorna resultado exitoso fuera de la transacción
    } catch (error) {
      // Manejo de errores
      console.error('Transaction failed:', error);
      throw {
        success: false,
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async findUserPerson(credentials: UserCredential) {
    try {
      const result = await db.transaction(async (trx) => {
        const user = await trx('users_credentials')
          .where({ user_name: credentials.user_name })
          .first();
        /*if(!user){
                    throw new Error('User not found');
                }*/

        /*if(!person){
                    throw new Error('Person not found');
                }*/
        if (!user) {
          return {
            success: false,
          };
        }
        return {
          success: true,
          user_name: user.user_name,
          password: user.password,
          person_id: user.person_id,
        };
      });
      return result;
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
}

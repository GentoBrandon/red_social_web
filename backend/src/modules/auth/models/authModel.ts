import db from '../../../config/dbConfig';
import { PersonModel } from '../../person/models/personModel';
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
        /*const resultInsertPerson = await trx('persons')
          .insert(person)
          .returning('id');*/
        const id = await PersonModel.insertWithTransaction(person, trx);

        console.log(id);
        // Insertar en la tabla 'user_credentials' usando el id retornado de 'person'
        const resultInsertUserCredential = await trx('users_credentials')
          .insert({
            ...user_credential,
            person_id: id, // Usa resultInsertPerson[0].id si devuelve un objeto
          })
          .returning('id');
        const resultInserUser = await trx('users').insert({
          users_credentiasl_id: resultInsertUserCredential[0].id,
        });
        if (
          !id ||
          id === 0 ||
          !resultInsertUserCredential ||
          resultInsertUserCredential.length === 0 ||
          !resultInserUser
        ) {
          throw new Error('Failed to insert person');
        }
        // Retorna el resultado de ambas inserciones si ambas tienen éxito
        return {
          success: true,
          person_id: id,
        };
      });

      return result; // Retorna resultado exitoso fuera de la transacción
    } catch (error) {
      // Manejo de errores
      console.error('Transaction failed:', error);
      throw {
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

  static async findPerson(person_id: number) {
    try {
      const result = await db('persons').where({ id: person_id }).first();
      if (!result) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
}

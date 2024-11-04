import {
  UserCredentialModel,
  UserCredentials,
} from '../../person/models/userCredentiaModel';
import { PersonModel, Person } from '../../person/models/personModel';
import { UserModel } from '../../person/models/userModel';
import db from '../../../config/dbConfig';
import CustomError from '../../../utils/customError';
import { ProfileModel } from '../../profile/models/profileModel';
export class AuthService {
  static async insertQwithTransaction(
    person: Person,
    user_credential: UserCredentials,
  ) {
    try {
      const result = await db.transaction(async (trx) => {
        const id = await PersonModel.insertWithTransaction(person, trx);
        const userData = { ...user_credential, person_id: id };
        const resultInsertUserCredential =
          await UserCredentialModel.insertWithTransaction(userData, trx);
        const resultUser = await UserModel.insertWithTransaction(
          { users_credentiasl_id: resultInsertUserCredential },
          trx,
        );
        const resultProfile = await ProfileModel.insertWithTransaction(
          { person_id: id },
          trx,
        );
        if (
          !id ||
          id === 0 ||
          !resultInsertUserCredential ||
          resultInsertUserCredential === 0 ||
          resultUser.length === 0 ||
          !resultUser ||
          resultProfile.length === 0 ||
          !resultProfile
        ) {
          return {
            success: false,
          };
        }
        return {
          success: true,
          person_id: id,
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

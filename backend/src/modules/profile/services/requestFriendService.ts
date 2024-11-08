import {
  RequestFriend,
  RequestFriendModel,
} from '../models/requestFriendModel';

import { PersonModel } from '../../person/models/personModel';

export default class RequestFriendService {
  static async createRequestFriend(requestFriend: RequestFriend) {
    try {
      const result =
        await RequestFriendModel.insertRequestFriend(requestFriend);
      if (!result) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async getRequestFriendAll() {
    try {
      const result = await RequestFriendModel.getRequestFriendAll();
      if (result.length === 0) {
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

  static async updateRequestFriend(id: number, requestFriend: RequestFriend) {
    try {
      const result = await RequestFriendModel.updateRequestFriend(
        id,
        requestFriend,
      );
      if (result === 0) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
  static async deleteRequestFriend(id: number) {
    try {
      const result = await RequestFriendModel.deleteRequestFriend(id);
      if (result === 0) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
  static async getAllFriendsByProfileId(id: number) {
    try {
      // Obtener el nombre de la persona solicitante
      const resultPerson = await PersonModel.getNamePersonById(id);
      if (!resultPerson) {
        return { success: false, message: 'Profile not found.' };
      }

      // Obtener la lista de amigos con el conteo de amigos en común usando la función `getAllFriendsByName`
      const result = await RequestFriendModel.getAllFriendsByName(id);
      if (result.length === 0) {
        return { success: false, message: 'No friends found.' };
      }

      // Transformar el resultado en un formato más legible incluyendo el ID del amigo
      const friends = result.map((friend: any) => ({
        friend_id: friend.friend_id,
        friend_name: `${friend.friend_first_name} ${friend.friend_last_name}`,
        mutual_friends_count: friend.mutual_friends_count,
      }));

      return {
        success: true,
        profile: `${resultPerson.first_name} ${resultPerson.last_name}`, // Nombre del perfil solicitante
        friends, // Lista de amigos con ID y el conteo de amigos en común
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

<<<<<<< HEAD
  /*
  static async getAllFriendsByProfileId(id: number) {
    try {
      // Obtener el nombre de la persona solicitante
      const resultPerson = await PersonModel.getNamePersonById(id);
      if (!resultPerson) {
        return { success: false, message: 'Profile not found.' };
      }

      // Obtener la lista de amigos con el conteo de amigos en común usando la función `getAllFriendsByName`
      const result = await RequestFriendModel.getAllFriendsByName(id);
      if (result.length === 0) {
        return { success: false, message: 'No friends found.' };
      }

      // Transformar el resultado en un formato más legible
      const friends = result.map((friend: any) => ({
        friend_name: `${friend.friend_first_name} ${friend.friend_last_name}`,
        mutual_friends_count: friend.mutual_friends_count,
      }));

      return {
        success: true,
        profile: `${resultPerson.first_name} ${resultPerson.last_name}`, // Nombre del perfil solicitante
        friends, // Lista de amigos con el conteo de amigos en común
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
=======
  static async searchFriendsByName(profileId: number, name: string) {
    try {
      const friends = await RequestFriendModel.searchFriendsByName(
        profileId,
        name,
      );

      if (friends.length === 0) {
        return { success: false, message: 'No friends found.' };
      }

      return {
        success: true,
        data: friends,
      };
    } catch (error) {
      throw {
        message: 'Error searching friends by name.',
>>>>>>> origin/apis
        stack: (error as Error).stack,
      };
    }
  }
<<<<<<< HEAD
*/
  static async accepteFriendsByProfileId(id1: number, id2: number) {
    try {
      const result = await RequestFriendModel.acceptedFriend(id1, id2);
      if (result === 0) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
  static async rejectFriendsByProfileId(id1: number, id2: number) {
    try {
      const result = await RequestFriendModel.rejectFriend(id1, id2);
      if (result === 0) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
  static async getStatusFriendsByProfileId(id1: number, id2: number) {
    try {
      const result = await RequestFriendModel.getFriendStatus(id1, id2);
      if (result === 0) {
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

  static async getRequestFriendById(id: number) {
    try {
      // Llama al modelo para obtener la solicitud de amistad por ID
      const result = await RequestFriendModel.getRequestsFriend(id);
      console.log(id);

      if (!result) {
        return {
          success: false,
          message: 'No se encontró la solicitud de amistad',
        };
      }

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      // Maneja el error lanzando un objeto con el mensaje y el stack del error
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async getReceivedRequestById(profile_id: number){
    try {
      const result = await RequestFriendModel.getReceivedRequestsFriend(profile_id);
      if(!result){
        return {
          success: false,
        }
      }
      return {
        success: true,
        data :result
      }
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack : (error as Error).stack
      }
    }
  }
=======
>>>>>>> origin/apis
}

import {
  RequestFriend,
  RequestFriendModel,
} from '../models/requestFriendModel';

import { PersonModel } from '../../person/models/personModel';
import { Request, Response, NextFunction } from 'express';
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

  static async getRequestFriendById(id: number) {
    try {
      const result = await RequestFriendModel.getRequestFriendById(id);
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
  
      // Obtener la lista de amigos
      const result = await RequestFriendModel.getAllFriendsByName(id);
      if (result.length === 0) {
        return { success: false, message: 'No friends found.' };
      }
  
      // Filtrar solo los nombres de los amigos en un arreglo simple
      const friends = result.map((friend: any) => {
        if (friend.requester_first_name === resultPerson.first_name &&
            friend.requester_last_name === resultPerson.last_name) {
          // Si el perfil actual es el solicitante, el amigo es el respondedor
          return `${friend.responder_first_name} ${friend.responder_last_name}`;
        } else {
          // Si el perfil actual es el respondedor, el amigo es el solicitante
          return `${friend.requester_first_name} ${friend.requester_last_name}`;
        }
      });
  
      return {
        success: true,
        profile: `${resultPerson.first_name} ${resultPerson.last_name}`, // Nombre del perfil solicitante
        friends: Array.from(new Set(friends)) // Lista de amigos sin duplicados
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
  
  
  
  
  
}

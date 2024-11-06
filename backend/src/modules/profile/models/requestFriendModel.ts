import BaseModel from '../../../utils/base/Model';
import { ProfileModel, Profile } from './profileModel';
import FriendStatusModel from './friendStatusModel';
import db from '../../../config/dbConfig';
export interface RequestFriend {
  id_profile_request: number;
  id_profile_response: number;
}

export class RequestFriendModel extends BaseModel<RequestFriend> {
  private static instance: RequestFriendModel = new RequestFriendModel();
  constructor() {
    super('request_friends');
  }
  static async insertRequestFriend(
    requestFriend: RequestFriend,
  ): Promise<number[]> {
    return this.instance.insert(requestFriend);
  }
  static async getRequestFriendAll(): Promise<RequestFriend[]> {
    return this.instance.getAll();
  }
  static async getRequestFriendById(id: number): Promise<RequestFriend> {
    return this.instance.find(id);
  }
  static async updateRequestFriend(
    id: number,
    requestFriend: RequestFriend,
  ): Promise<number> {
    return this.instance.update(id, requestFriend);
  }
  static async deleteRequestFriend(id: number): Promise<number> {
    return this.instance.delete(id);
  }
  // Asegúrate de importar correctamente tu instancia de Knex
  static async getAllFriendsByName(profile_id: number): Promise<any[]> {
    const query = `
      SELECT DISTINCT
        CASE
          WHEN rf.id_profile_request = ? THEN pr_response.first_name
          ELSE pr_request.first_name
        END AS friend_first_name,
        CASE
          WHEN rf.id_profile_request = ? THEN pr_response.last_name
          ELSE pr_request.last_name
        END AS friend_last_name,
        
        -- Obtener el ID del amigo
        CASE
          WHEN rf.id_profile_request = ? THEN rf.id_profile_response
          ELSE rf.id_profile_request
        END AS friend_id,
        
        -- Subconsulta para contar los amigos en común
        (
          SELECT COUNT(*)
          FROM request_friends rf2
          WHERE rf2.id_status = 1
            AND rf2.id_profile_request != ?
            AND rf2.id_profile_response != ?
            AND (
              -- Condición para contar solo amigos en común exactos
              (rf2.id_profile_request = rf.id_profile_request AND rf2.id_profile_response IN (
                SELECT CASE
                  WHEN rf3.id_profile_request = ? THEN rf3.id_profile_response
                  ELSE rf3.id_profile_request
                END
                FROM request_friends rf3
                WHERE rf3.id_status = 1
                  AND (rf3.id_profile_request = ? OR rf3.id_profile_response = ?)
              ))
              OR
              (rf2.id_profile_response = rf.id_profile_response AND rf2.id_profile_request IN (
                SELECT CASE
                  WHEN rf3.id_profile_request = ? THEN rf3.id_profile_response
                  ELSE rf3.id_profile_request
                END
                FROM request_friends rf3
                WHERE rf3.id_status = 1
                  AND (rf3.id_profile_request = ? OR rf3.id_profile_response = ?)
              ))
            )
        ) AS mutual_friends_count
  
      FROM
        request_friends rf
      JOIN
        profiles p_request ON rf.id_profile_request = p_request.id
      JOIN
        persons pr_request ON p_request.person_id = pr_request.id
      JOIN
        profiles p_response ON rf.id_profile_response = p_response.id
      JOIN
        persons pr_response ON p_response.person_id = pr_response.id
      WHERE
        rf.id_status = 1
        AND (rf.id_profile_request = ? OR rf.id_profile_response = ?);
    `;

    // Ejecuta la consulta usando db.raw y pasa el profile_id para cada binding
    const result = await db.raw(query, [
      profile_id,
      profile_id, // Para las selecciones de nombres
      profile_id, // Para el ID del amigo
      profile_id,
      profile_id, // Para las restricciones en la subconsulta
      profile_id,
      profile_id,
      profile_id, // Para la primera subconsulta
      profile_id,
      profile_id,
      profile_id, // Para la segunda subconsulta
      profile_id,
      profile_id, // Para el WHERE principal
    ]);

    return result.rows; // Devuelve solo las filas resultantes
  }
  /*
  static async getAllFriendsByName(profile_id: number): Promise<any[]> {
    const query = `
      SELECT DISTINCT
        CASE
          WHEN rf.id_profile_request = ? THEN pr_response.first_name
          ELSE pr_request.first_name
        END AS friend_first_name,
        CASE
          WHEN rf.id_profile_request = ? THEN pr_response.last_name
          ELSE pr_request.last_name
        END AS friend_last_name,
  
        -- Subconsulta para contar los amigos en común
        (
          SELECT COUNT(*)
          FROM request_friends rf2
          WHERE rf2.id_status = 1
            AND rf2.id_profile_request != ?
            AND rf2.id_profile_response != ?
            AND (
              -- Condición para contar solo amigos en común exactos
              (rf2.id_profile_request = rf.id_profile_request AND rf2.id_profile_response IN (
                SELECT CASE
                  WHEN rf3.id_profile_request = ? THEN rf3.id_profile_response
                  ELSE rf3.id_profile_request
                END
                FROM request_friends rf3
                WHERE rf3.id_status = 1
                  AND (rf3.id_profile_request = ? OR rf3.id_profile_response = ?)
              ))
              OR
              (rf2.id_profile_response = rf.id_profile_response AND rf2.id_profile_request IN (
                SELECT CASE
                  WHEN rf3.id_profile_request = ? THEN rf3.id_profile_response
                  ELSE rf3.id_profile_request
                END
                FROM request_friends rf3
                WHERE rf3.id_status = 1
                  AND (rf3.id_profile_request = ? OR rf3.id_profile_response = ?)
              ))
            )
        ) AS mutual_friends_count
  
      FROM
        request_friends rf
      JOIN
        profiles p_request ON rf.id_profile_request = p_request.id
      JOIN
        persons pr_request ON p_request.person_id = pr_request.id
      JOIN
        profiles p_response ON rf.id_profile_response = p_response.id
      JOIN
        persons pr_response ON p_response.person_id = pr_response.id
      WHERE
        rf.id_status = 1
        AND (rf.id_profile_request = ? OR rf.id_profile_response = ?);
    `;

    // Ejecuta la consulta usando db.raw y pasa el profile_id para cada binding
    const result = await db.raw(query, [
      profile_id,
      profile_id, // Para las selecciones de nombres
      profile_id,
      profile_id, // Para las restricciones en la subconsulta
      profile_id,
      profile_id,
      profile_id, // Para la primera subconsulta
      profile_id,
      profile_id,
      profile_id, // Para la segunda subconsulta
      profile_id,
      profile_id, // Para el WHERE principal
    ]);

    return result.rows; // Devuelve solo las filas resultantes
  }
*/
  static async acceptedFriend(id1: number, id2: number): Promise<number> {
    const result = await db(this.instance.table)
      .where({ id_profile_request: id1, id_profile_response: id2 })
      .update({ id_status: 1 });

    const result2 = await db(this.instance.table)
      .where({ id_profile_request: id2, id_profile_response: id1 })
      .update({ id_status: 1 });

    if (result === 0 || result2 === 0) {
      return 0;
    }
    return 1;
  }

  static async rejectFriend(id1: number, id2: number): Promise<number> {
    const result = await db(this.instance.table)
      .where({ id_profile_request: id1, id_profile_response: id2 })
      .delete();
    const result2 = await db(this.instance.table)
      .where({ id_profile_request: id2, id_profile_response: id1 })
      .delete();
    if (result === 0 || result2 === 0) {
      return 0;
    }
    return 1;
  }

  static async getFriendStatus(
    id_profile_request: number,
    id_profile_response: number,
  ): Promise<any> {
    const result = await db(this.instance.table)
      .where({ id_profile_request, id_profile_response })
      .select('id_status');
    const resultStatus = await FriendStatusModel.find(result[0].id_status);
    if (!resultStatus || resultStatus === undefined) {
      return 0;
    }
    if (resultStatus.name_status == 'Accepted') {
      return 'amigos';
    } else if (resultStatus.name_status == 'Pending') {
      return 'pendiente';
    }
    return resultStatus.name_status;
  }

  /*
  static async getRequestsFriend(profileId:number): Promise<any[]>{
    console.log(profileId)
    const query = `
    SELECT DISTINCT
      pr_response.first_name AS friend_first_name,
      pr_response.last_name AS friend_last_name,

      -- Subconsulta para contar solo los amigos en común exactos
      (
        SELECT COUNT(*)
        FROM request_friends rf2
        WHERE rf2.id_status = 1
          AND (
            (rf2.id_profile_request = :profileId AND rf2.id_profile_response IN (
              SELECT rf3.id_profile_response
              FROM request_friends rf3
              WHERE rf3.id_status = 1
                AND rf3.id_profile_request = rf.id_profile_response
                AND rf3.id_profile_response != :profileId -- Excluir el perfil actual
            ))
            OR
            (rf2.id_profile_response = :profileId AND rf2.id_profile_request IN (
              SELECT rf3.id_profile_request
              FROM request_friends rf3
              WHERE rf3.id_status = 1
                AND rf3.id_profile_response = rf.id_profile_response
                AND rf3.id_profile_request != :profileId -- Excluir el perfil actual
            ))
          )
      ) AS mutual_friends_count

    FROM
      request_friends rf
    JOIN
      profiles p_request ON rf.id_profile_request = p_request.id
    JOIN
      persons pr_request ON p_request.person_id = pr_request.id
    JOIN
      profiles p_response ON rf.id_profile_response = p_response.id
    JOIN
      persons pr_response ON p_response.person_id = pr_response.id
    WHERE
      rf.id_status = 2  -- Filtrar solo solicitudes enviadas con id_status = 2
      AND rf.id_profile_request = :profileId;  -- Filtrar por el perfil actual como solicitante
  `;

  // Ejecuta la consulta usando db.raw y pasa profileId como parámetro
  const result = await db.raw(query, { profileId });

  // Formatea el resultado en el formato deseado
  return result.rows.map((row:any) => ({
    id: row.id,
    friend_name: `${row.friend_first_name} ${row.friend_last_name}`,
    mutual_friends_count: row.mutual_friends_count
  }));
  }*/
  static async getRequestsFriend(profileId: number): Promise<any[]> {
    console.log(profileId);
    const query = `
      SELECT DISTINCT
        CASE
          WHEN rf.id_profile_request = :profileId THEN rf.id_profile_response
          ELSE rf.id_profile_request
        END AS friend_profile_id,
        pr_response.first_name AS friend_first_name,
        pr_response.last_name AS friend_last_name,
  
        -- Subconsulta para contar solo los amigos en común exactos
        (
          SELECT COUNT(*)
          FROM request_friends rf2
          WHERE rf2.id_status = 1
            AND (
              (rf2.id_profile_request = :profileId AND rf2.id_profile_response IN (
                SELECT rf3.id_profile_response
                FROM request_friends rf3
                WHERE rf3.id_status = 1
                  AND rf3.id_profile_request = rf.id_profile_response
                  AND rf3.id_profile_response != :profileId -- Excluir el perfil actual
              ))
              OR
              (rf2.id_profile_response = :profileId AND rf2.id_profile_request IN (
                SELECT rf3.id_profile_request
                FROM request_friends rf3
                WHERE rf3.id_status = 1
                  AND rf3.id_profile_response = rf.id_profile_response
                  AND rf3.id_profile_request != :profileId -- Excluir el perfil actual
              ))
            )
        ) AS mutual_friends_count
  
      FROM
        request_friends rf
      JOIN
        profiles p_request ON rf.id_profile_request = p_request.id
      JOIN
        persons pr_request ON p_request.person_id = pr_request.id
      JOIN
        profiles p_response ON rf.id_profile_response = p_response.id
      JOIN
        persons pr_response ON p_response.person_id = pr_response.id
      WHERE
        rf.id_status = 2  -- Filtrar solo solicitudes enviadas con id_status = 2
        AND rf.id_profile_request = :profileId;  -- Filtrar por el perfil actual como solicitante
    `;

    // Ejecuta la consulta usando db.raw y pasa profileId como parámetro
    const result = await db.raw(query, { profileId });

    // Formatea el resultado en el formato deseado
    return result.rows.map((row: any) => ({
      friend_profile_id: row.friend_profile_id,
      friend_name: `${row.friend_first_name} ${row.friend_last_name}`,
      mutual_friends_count: row.mutual_friends_count,
    }));
  }
}

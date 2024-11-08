import BaseModel from '../../../utils/base/Model';
import db from '../../../config/dbConfig';

export interface PostComments {
  id_profile: number;
  id_post: number;
  comment: string;
}

export class PostComentsModel extends BaseModel<PostComments> {
  private static postComentesInstance: PostComentsModel =
    new PostComentsModel();
  constructor() {
    super('post_comments');
  }
  static async inserCommentsModel(data: PostComments): Promise<number[]> {
    return await this.postComentesInstance.insert(data);
  }

  static async getAllComentsModel(): Promise<PostComments[]> {
    return await this.postComentesInstance.getAll();
  }

  static async getIdComentsModel(id: number): Promise<PostComments> {
    return await this.postComentesInstance.find(id);
  }

  static async deleteCommentModel(id: number): Promise<number> {
    return await this.postComentesInstance.delete(id);
  }

  static async countCommentsPost(idPost: number): Promise<number> {
    const resultCount = await db(this.postComentesInstance.table)
      .where({ id_post: idPost })
      .count('*');
    // `resultCount` devuelve un array de objetos, necesitamos extraer el valor
    const count = resultCount[0]?.count ?? 0;
    // Convertir el valor a número ya que nos devuelve en un string
    return Number(count);
  }
  // Método para obtener comentarios con el nombre completo del perfil y el comentario
  static async getCommentsByPostFullName(
    idPost: number,
  ): Promise<{ first_name: string; last_name: string; comment: string }[]> {
    const comments = await db('post_comments')
      .join('profiles', 'post_comments.id_profile', '=', 'profiles.id')
      .join('persons', 'profiles.person_id', '=', 'persons.id')
      .where('post_comments.id_post', idPost)
      .select(
        'persons.first_name',
        'persons.last_name',
        'post_comments.comment',
        'post_comments.date',
      )
      .orderBy('post_comments.date', 'desc');
    return comments;
  }
}

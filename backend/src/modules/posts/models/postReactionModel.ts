import BaseModel from '../../../utils/base/Model';
import db from '../../../config/dbConfig';

export interface PostReactions {
  id_profile: number;
  id_post: number;
  reactions: boolean;
}

export class PostReactionsModel extends BaseModel<PostReactions> {
  private static postReactionInstance: PostReactionsModel =
    new PostReactionsModel();
  constructor() {
    super('post_reactions');
  }

  static async insertPostsReactions(data: PostReactions): Promise<number[]> {
    return await this.postReactionInstance.insert(data);
  }

  static async getallPostsReactions(): Promise<PostReactions[]> {
    return await this.postReactionInstance.getAll();
  }

  static async getPostsReactionsId(id: number): Promise<PostReactions> {
    return await this.postReactionInstance.find(id);
  }

  static async deletePostsReactionsByProfile(
    idProfile: number,
  ): Promise<number> {
    const result = await db(this.postReactionInstance.table)
      .where({ id_profile: idProfile })
      .delete();
    if (result === 0) {
      return 0;
    }
    return 1;
  }

  static async countReactionsByProfile(): Promise<number> {
    const resultCount = await db(this.postReactionInstance.table).count('*'); 
    // `resultCount` devuelve un array de objetos, necesitamos extraer el valor
    const count = resultCount[0]?.count ?? 0;
    // Convertir el valor a número ya que nos devuelve en un string
    return Number(count);
  }
}

import BaseModel from '../../../utils/base/Model';
import db from '../../../config/dbConfig';

export interface Posts {
  id_profile: number;
  description: string;
  content: string;
}

export class PostsModel extends BaseModel<Posts> {
  private static postsModelInstance: PostsModel = new PostsModel();
  constructor() {
    super('posts');
  }

  static async insertPosts(data: Posts): Promise<number[]> {
    return await this.postsModelInstance.insert(data);
  }

  static async getAllPosts(): Promise<Posts[]> {
    return await this.postsModelInstance.getAll();
  }

  static async getPostsId(id: number): Promise<Posts> {
    return await this.postsModelInstance.find(id);
  }

  static async updatePosts(id: number, data: Posts): Promise<number> {
    return await this.postsModelInstance.update(id, data);
  }

    static async deletePost(id: number): Promise<number>{
        return await this.postsModelInstance.delete(id);
    }

    static async deletePostByProfile(id: number,idProfile: number):Promise<number>{
        const resultDelete = await db(this.postsModelInstance.table).where({id: id,id_profile: idProfile}).delete();
        if (resultDelete === 0) {
            return 0;
        }
        return 1;
    }
    static async getAllPostsById(id:number){
      const result = await db(this.postsModelInstance.table)
      .join('profiles', 'posts.id_profile', '=', 'profiles.id')
      .join('persons', 'profiles.person_id', '=', 'persons.id')
      .select('posts.*','persons.first_name as name_person','persons.last_name as last_name_person')
      .where('posts.id_profile',id)

      if(!result){
        return 0
      }
      return result
    }
}
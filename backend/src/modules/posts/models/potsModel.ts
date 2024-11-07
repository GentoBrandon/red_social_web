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
    static async getFriendsPostsAndShares(id_profile: number): Promise<any[]> {
      const result = await db('request_friends')
          .join('profiles as friend_profile', function () {
              this.on('friend_profile.id', '=', 'request_friends.id_profile_request')
                  .orOn('friend_profile.id', '=', 'request_friends.id_profile_response');
          })
          .join('persons as friend_person', 'friend_person.id', '=', 'friend_profile.person_id')
          .leftJoin('posts', 'posts.id_profile', '=', 'friend_profile.id')  // Posts originales de amigos
          .leftJoin('posts_share', 'posts_share.id_profile', '=', 'friend_profile.id') // Posts compartidos de amigos
          .leftJoin('posts as original_post', 'original_post.id', '=', 'posts_share.id_post') // Post original de los compartidos
          .distinct(
              'friend_profile.id as friend_profile_id',
              'friend_person.first_name as friend_first_name',
              'friend_person.last_name as friend_last_name',
              'posts.id as post_id',
              'posts.content as post_content',
              'posts.date as post_date',
              'posts_share.id as post_share_id',
              'posts_share.description as post_share_description',
              'posts_share.date as post_share_date',
              'original_post.content as original_post_content',
              'original_post.date as original_post_date'
          )
          .where(function () {
              this.where('request_friends.id_profile_request', id_profile)
                  .orWhere('request_friends.id_profile_response', id_profile);
          })
          .andWhere('friend_profile.id', '!=', id_profile)  // Excluir el perfil actual
          .andWhere('request_friends.id_status', 1)
          .orderBy('posts.date', 'desc')
          .orderBy('posts_share.date', 'desc');
  
      if (result.length === 0) {
          return [];
      }
  
      // Estructuramos el resultado para que se agrupe por cada amigo y sus posts y posts compartidos
      const groupedResult = result.reduce((acc, row) => {
          const friendKey = `${row.friend_profile_id}`;
          
          if (!acc[friendKey]) {
              acc[friendKey] = {
                  friend_name: `${row.friend_first_name} ${row.friend_last_name}`,
                  posts: [],
                  posts_shares: []
              };
          }
          
          // Agregar el post original si no está ya en la lista
          if (row.post_id && !acc[friendKey].posts.some((post:any) => post.id === row.post_id)) {
              acc[friendKey].posts.push({
                  id: row.post_id,
                  content: row.post_content,
                  date: row.post_date
              });
          }
          
          // Agregar el post compartido si no está ya en la lista
          if (row.post_share_id && !acc[friendKey].posts_shares.some((share:any) => share.id === row.post_share_id)) {
              acc[friendKey].posts_shares.push({
                  id: row.post_share_id,
                  description: row.post_share_description,
                  date: row.post_share_date,
                  original_content: row.original_post_content,
                  original_date: row.original_post_date
              });
          }
          
          return acc;
      }, {});
  
      // Convertimos el objeto agrupado en un array
      return Object.values(groupedResult);
  }
  
  
  }
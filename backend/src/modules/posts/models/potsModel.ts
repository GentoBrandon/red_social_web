import BaseModel from '../../../utils/base/Model';

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

    static async insertPosts(data: Posts):Promise<number[]>{
        return await this.postsModelInstance.insert(data);
    }

    static async getAllPosts():Promise<Posts[]>{
        return await this.postsModelInstance.getAll();
    }

    static async getPostsId(id: number):Promise<Posts>{
        return await this.postsModelInstance.find(id);
    }

    static async updatePosts(id: number, data: Posts): Promise<number>{
        return await this.postsModelInstance.update(id, data);
    }

    static async deletePost(id: number): Promise<number>{
        return await this.postsModelInstance.delete(id);
    }
}

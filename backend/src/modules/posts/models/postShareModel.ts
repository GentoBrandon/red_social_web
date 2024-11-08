import BaseModel from '../../../utils/base/Model';

export interface Posts_Share {
  id_profile: number;
  id_post: number;
  description: string;
}

export class PostShareModel extends BaseModel<Posts_Share> {
  private static postShareInstance: PostShareModel = new PostShareModel();
  constructor() {
    super('posts_share');
  }

  static async insertPostShare(data: Posts_Share): Promise<number[]> {
    return await this.postShareInstance.insert(data);
  }

  static async getAllPostShare(): Promise<Posts_Share[]> {
    return await this.postShareInstance.getAll();
  }

  static async getPostShareId(id: number): Promise<Posts_Share> {
    return await this.postShareInstance.find(id);
  }

  static async updatePostShare(id: number, data: Posts_Share): Promise<number> {
    return await this.postShareInstance.update(id, data);
  }

  static async deletePostShare(id: number): Promise<number> {
    return await this.postShareInstance.delete(id);
  }
}

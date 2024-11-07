import BaseModel from '../../../utils/base/Model';
import dbConfig from '../../../config/dbConfig';
export interface Posts_Share {
    id_profile: number;
    id_post: number;
    description: string;
}

export class PostShareModel extends BaseModel <Posts_Share>{
    private static postShareInstance: PostShareModel = new PostShareModel();
    constructor(){
        super("posts_share");
    }
    
    static async insertPostShare(data: Posts_Share):Promise<number[]>{
        return await this.postShareInstance.insert(data);
    }

    static async getAllPostShare():Promise<Posts_Share[]>{
        return await this.postShareInstance.getAll();
    }

    static async getPostShareId(id: number):Promise<Posts_Share>{
        return await this.postShareInstance.find(id);
    }

    static async updatePostShare(id: number, data: Posts_Share): Promise<number>{
        return await this.postShareInstance.update(id, data);
    }

    static async deletePostShare(id: number): Promise<number>{
        return await this.postShareInstance.delete(id);
    }
    static async getAllPostsShareAndPostOriginalByProfileId(id_profile: number): Promise<any[]>{
        const result = await dbConfig(this.postShareInstance.table)
    .join('posts', 'posts.id', '=', 'posts_share.id_post')
    .join('profiles as owner_profile', 'owner_profile.id', '=', 'posts.id_profile')  // Perfil del propietario del post original
    .join('persons as owner_person', 'owner_person.id', '=', 'owner_profile.person_id') // Persona del propietario del post original
    .join('profiles as sharer_profile', 'sharer_profile.id', '=', 'posts_share.id_profile') // Perfil del que comparte
    .join('persons as sharer_person', 'sharer_person.id', '=', 'sharer_profile.person_id') // Persona del que comparte
    .select(
        'posts_share.* as post_shared',  // Información del post compartido
        'posts.* as post_original',      // Información del post original
        'owner_person.name as owner_name', // Nombre del propietario original del post
        'sharer_person.name as sharer_name' // Nombre de quien está compartiendo el post
    );
    if(result.length === 0){
        return [];
    }
    return result;
    }
}
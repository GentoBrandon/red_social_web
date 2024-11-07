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
    static async getAllPostsShareAndPostOriginalByProfileId(id_profile: number): Promise<any[]> {
        const result = await dbConfig(this.postShareInstance.table)
            .join('posts', 'posts.id', '=', 'posts_share.id_post')
            .join('profiles as owner_profile', 'owner_profile.id', '=', 'posts.id_profile')  // Perfil del propietario del post original
            .join('persons as owner_person', 'owner_person.id', '=', 'owner_profile.person_id') // Persona del propietario del post original
            .join('profiles as sharer_profile', 'sharer_profile.id', '=', 'posts_share.id_profile') // Perfil del que comparte
            .join('persons as sharer_person', 'sharer_person.id', '=', 'sharer_profile.person_id') // Persona del que comparte
            .select(
                'posts_share.id as shared_id',
                'posts_share.id_profile as shared_profile_id',
                'posts_share.id_post as shared_post_id',
                'posts_share.description as shared_description',
                'posts_share.date as shared_date',
                'posts.id as original_post_id',
                'posts.id_profile as original_profile_id',
                'posts.content as original_content',
                'posts.date as original_date',
                'owner_person.first_name as owner_first_name',
                'owner_person.last_name as owner_last_name',
                'sharer_person.first_name as sharer_first_name',
                'sharer_person.last_name as sharer_last_name'
            )
            .where('posts_share.id_profile', id_profile);
    
        if (result.length === 0) {
            return [];
        }
    
        // Estructurar el resultado en el formato deseado
        return result.map(row => ({
            post_shared: {
                id: row.shared_id,
                id_profile: row.shared_profile_id,
                id_post: row.shared_post_id,
                description: row.shared_description,
                date: row.shared_date
            },
            post_original: {
                id: row.original_post_id,
                id_profile: row.original_profile_id,
                content: row.original_content,
                date: row.original_date
            },
            owner_name: `${row.owner_first_name} ${row.owner_last_name}`,
            sharer_name: `${row.sharer_first_name} ${row.sharer_last_name}`
        }));
    }
    
}
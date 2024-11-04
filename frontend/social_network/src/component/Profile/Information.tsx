'use client';
import { Separator } from "@/components/ui/separator";
import EditProfile from "@/component/Profile/EditProfile";
import style from "../../styles/Profile/Information.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTES, ROUTES_PROFILE } from "@/routes/apiRoutes";

interface Profile {
    presentation: string;
    address: string;
    phone_number: string;
    job: string;
    university: string;
}
interface ProfilePersonal{
    first_name: string;
    last_name: string;
    birth_date: string;
    email: string;
}

function Information() {
    const [profilePersonal, setProfilePersonal] = useState<ProfilePersonal | null>(null);
    const [profileId, setProfileId] = useState<number | null>(null);
    const [profileData, setProfileData] = useState<Profile | null>(null);

    // Función para obtener el ID del perfil
    const fetchProfileId = async (): Promise<void> => {
        try {
            const response = await axios.get(API_ROUTES.DASHBOARD, { withCredentials: true });
            const id = response.data.person.id;
            setProfileId(id); // Almacena solo el ID
            console.log("Profile ID:", id);
        } catch (error) {
            console.error("Error al obtener el ID del perfil:", error);
        }
    };

    const dataPersonal = async (): Promise<void> => {
        try {
            const response = await axios.get(API_ROUTES.DASHBOARD, { withCredentials: true });
            const personal = response.data.person;
            setProfilePersonal(personal);
            console.log(personal);
        } catch (error) {
            console.error("Error al obtener el ID del perfil:", error);
        }
    }

    // Función para obtener los datos completos del perfil usando el ID
    const fetchProfileData = async (id: number): Promise<void> => {
        try {
            const response = await axios.get(`${ROUTES_PROFILE.FIND_PROFILE_BY_ID}${id}`, { withCredentials: true });
            setProfileData(response.data); // Almacena los datos completos del perfil
            console.log("Profile Data:", response.data);
        } catch (error) {
            console.error("Error al obtener los datos del perfil:", error);
        }
    };

    // Llama a fetchProfileId cuando el componente se monte
    useEffect(() => {
        fetchProfileId();
        dataPersonal();
    }, []);

    // Llama a fetchProfileData cuando profileId cambia y no es null
    useEffect(() => {
        if (profileId !== null) {
            fetchProfileData(profileId);
        }
    }, [profileId]);

    return (
        <div>
            <h1>Information Brandon Gento</h1>
            <div>
                <img src="/avatar.png" alt="Usuario" className={style.img} />
                <div>
                    <h2 className={style.h2}>Nombre</h2 >
                    <p>{profilePersonal?.first_name} {profilePersonal?.last_name}</p>
                </div>
            </div>
            <Separator/>
            <div>
                <img src="/location.png" alt="Direecion" className={style.img}/>
                <div>
                    <h2 className={style.h2}>Direccion</h2 >
                    <p>{profileData?.address}</p>
                </div>
            </div>
            <Separator/>
            <div>
                <img src="/phone.png" alt="Numero de telefono" className={style.img} />   
                <div>
                    <h2 className={style.h2}>Numero de telefono</h2 >
                    <p>{profileData?.phone_number}</p>
                </div>
            </div>
            <Separator/>
            <div>
                <img src="/job.png" alt="Trabajo" className={style.img} />
                <div>
                    <h2 className={style.h2}>Trabajo</h2 >
                    <p>{profileData?.job}</p>
                </div>
            </div>
            <Separator/>
            <div>
                <img src="/school.png" alt="Universidad" className={style.img}/>
                <h2 className={style.h2}>Universidad</h2 >
                <div>
                    <p>{profileData?.university}</p>
                </div>
            </div>
            <Separator/>
            <div className={style.btn}>
                <EditProfile />
            </div>

        </div>
    );
}
export default Information;
'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { ROUTES_PROFILE, Routes_friend } from '../../routes/apiRoutes';
import { fetchProfileId } from "@/services/IdProfile";
import styles from "../../styles/Profile/CardProfile.module.css";

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
}

interface Data {
  presentation: string;
  address: string;
  phone_number: string;
  job: string;
  university: string;
}

function Search() {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [idProfile, setIdProfile] = useState<number | null>(null);
  const [user, setUser] = useState<Data>({
    presentation: "",
    address: "",
    phone_number: "",
    job: "",
    university: "",
  });

  // Función para buscar amigos en base al texto ingresado
  const searchFriends = async () => {
    if (!search.trim()) return; // Evitar búsqueda si el campo está vacío
    
    setLoading(true);
    try {
      const response = await axios.get<Profile[]>(`${ROUTES_PROFILE.GET_PROFILE_NAME}/${search}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error al buscar el perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para enviar solicitud de amistad con un objeto JSON en el cuerpo de la solicitud
  const sendFriendRequest = async (selectedUserId: number) => {
    if (idProfile === null) return; // Verificar que el ID del perfil esté definido

    try {
      const payload = {
        "id_profile_request": idProfile,
        "id_profile_response": selectedUserId
      };
      console.log("Payload:", payload);
      const response = await axios.post(Routes_friend.CREATE_REQUEST, payload, {
        withCredentials: true,
      });
      console.log("Solicitud de amistad enviada:", response.data);
    } catch (error) {
      console.error("Error al enviar solicitud de amistad:", error);
    }
  };

  // Obtiene el ID del perfil del usuario actual
  useEffect(() => {
    const fetchAndSetProfileData = async () => {
      try {
        const id = await fetchProfileId();
        setIdProfile(id);
      } catch (error) {
        console.error("Error al obtener el ID del perfil:", error);
      }
    };

    fetchAndSetProfileData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
      <input
        type="text"
        placeholder="Buscar amigos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}

      />
      <button onClick={searchFriends} className={styles.btnSearch}>Buscar</button>
      </div>

      {loading && <p>Loading...</p>}

      {searchResults.map((result) => (
        <div key={result.id} className={styles.card}>
          <div className={styles.avatar}>
            <img src="/avatar.png" alt="Avatar" />
          </div>
          <p className={styles.name}>{result.first_name} {result.last_name}</p>
          <p className={styles.info}>Amigo</p>
          <div className={styles.button}>
            <button onClick={() => sendFriendRequest(result.id)}>Agregar amigo</button>
          </div>
        </div>
      ))}

      {searchResults.length === 0 && !loading && search && <p>No se encontraron coincidencias.</p>}
    </div>
  );
}

export default Search;

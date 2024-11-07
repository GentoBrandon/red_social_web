const PORT = 5000;
const API_BASE_URL = `http://localhost:${PORT}`;
const ROUTES = {
    Persons: '/api/persons',
    UserCredentials: '/api/user-credentials',
    Profile: '/api/profile',
    Auth: '/api/auth',
    RequestFriend: '/api/request-friend',
    Posts: '/api/posts'
}

export const API_ROUTES = {
    LOGIN: `${API_BASE_URL}${ROUTES.Auth}/login`,
    REGISTER: `${API_BASE_URL}${ROUTES.Auth}/register`,
    LOGOUT: `${API_BASE_URL}${ROUTES.Auth}/logout`,
    DASHBOARD: `${API_BASE_URL}${ROUTES.Auth}/dashboard`
};
export const ROUTES_PROFILE = {
    GET_ALL_PROFILE: `${API_BASE_URL}${ROUTES.Profile}/get-all-profile`,
    FIND_PROFILE_BY_ID: `${API_BASE_URL}${ROUTES.Profile}/find-profile-id/`,
    UPDATE_PROFILE: `${API_BASE_URL}${ROUTES.Profile}/update-profile/id`,
    DELETE_PROFILE: `${API_BASE_URL}${ROUTES.Profile}/delete-profile/id/`,
    GET_PROFILE_NAME: `${API_BASE_URL}${ROUTES.Profile}/find-profile-by-name`
};

export const Routes_friend = {
    CREATE_REQUEST: `${API_BASE_URL}${ROUTES.RequestFriend}/create-request-friend`, //Crear solicitud de amistad
    ACCEPTED_FRIEND: `${API_BASE_URL}${ROUTES.RequestFriend}/accepted-friend/`, //Aceptar solicitud de amistad
    DELETE_REQUEST_1ID: `${API_BASE_URL}${ROUTES.RequestFriend}/reject-friend/`, // Rechazar solicitud de amistad
    GET_FRIENDS_LIST: `${API_BASE_URL}${ROUTES.RequestFriend}/get-friends-commons-friends/` //obtener amigos
}

export const Routes_Post = {
    CREATE_POST: `${API_BASE_URL}${ROUTES.Posts}/create-post`, //Crear post
    GET_POST: `${API_BASE_URL}${ROUTES.Posts}/get-post`, //Obtener todos los post
    GET_POST_ID: `${API_BASE_URL}${ROUTES.Posts}/get-id-post/`, //Obtener post por id
    DELETE_POST: `${API_BASE_URL}${ROUTES.Posts}/delete-post/`, //Eliminar post pod id
    DELETE_POST_PROFILE: `${API_BASE_URL}${ROUTES.Posts}/delete-post-profile/`, //Eliminar post por id y perfil
    UPDATE_POST: `${API_BASE_URL}${ROUTES.Posts}/update-post/`, //Actualizar post por id
    GET_POST_PROFILE: `${API_BASE_URL}${ROUTES.Posts}/get-all-post-profile/` //Obtener todos los post de un perfil
}
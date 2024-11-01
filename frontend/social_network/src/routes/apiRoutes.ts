const PORT = 5000;
const API_BASE_URL = `http://localhost:${PORT}`;
const ROUTES = {
    Persons: '/api/persons',
    UserCredentials: '/api/user-credentials',
    Profile: '/api/profile',
    Auth: '/api/auth'
}

export const API_ROUTES = {
    LOGIN: `${API_BASE_URL}${ROUTES.Auth}/login`,
    REGISTER: `${API_BASE_URL}${ROUTES.Auth}/register`
};
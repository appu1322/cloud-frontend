export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const HEADERS = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`
}

export const USER = 'user';

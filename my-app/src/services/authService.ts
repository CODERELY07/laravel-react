import axios from "axios";
import type { User } from "../types/User";

const APP_URL = "http://127.0.0.1:8000/api";

export const register = (data: User) => axios.post(APP_URL + '/register', data);
export const login = (data: Omit<User, 'name' | 'confirm_password'>) => axios.post(APP_URL + '/login', data);
export const profile = (data: Omit<User, 'confirm_password'>, token: string) => axios.post(APP_URL + '/profile', data, {
    headers:{
        Authorization: `Bearer ${token}`
    }
});
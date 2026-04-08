import axios from "axios";
import type { Post } from "../types/Post";

const APP_URL = "http://127.0.0.1:8000/api";

export const getPosts = () => axios.get<Post[]>(APP_URL + '/posts');
export const createPost = (data: Omit<Post, 'id'>) => axios.post<Post>(APP_URL + '/posts',data);
export const getPost = (id: number | string) => axios.get<Post>(APP_URL + '/posts/' + id);
export const updatePost = (id: number | string, data: Omit<Post, 'id'>) => axios.put<Post>(APP_URL + '/posts/' + id, data);
export const deletePost = (id: number | string) => axios.delete<Post>(APP_URL + '/posts/' + id);


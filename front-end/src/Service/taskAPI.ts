import axios from 'axios';
import { CreateTask } from '../types/Task';
import config from '../config';

const API_URL = 'http://localhost:8080/api/task';

export const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTask = async (task: CreateTask) => {
    const response = await axios.post(`${API_URL}`, task,config);
    return response.data;
};

export const updateTask = async (id: string, task: CreateTask) => {
    const response = await axios.put(`${API_URL}/:${id}`, task,config);
    return response.data;
};

export const deleteTask = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`,config);
    return response.data;
};

export const addComment = async (id: string, comment: string) => {
    const response = await axios.post(`${API_URL}/${id}/comments`, comment,config );
    return response.data;
};

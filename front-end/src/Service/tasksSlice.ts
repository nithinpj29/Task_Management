import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, createTask, updateTask, deleteTask, addComment } from './taskAPI';
import { Task, CreateTask } from '../types/Task';

interface TasksState {
    tasks: Task[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TasksState = {
    tasks: [],
    status: 'idle',
};

export const getTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    return await fetchTasks();
});

export const addNewTask = createAsyncThunk('tasks/createTask', async (task: CreateTask) => {
    return await createTask(task);
});

export const editTask = createAsyncThunk('tasks/updateTask', async ({ id, task }: { id: string; task: CreateTask }) => {
    return await updateTask(id, task);
});

export const removeTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
    return await deleteTask(id);
});

export const addNewComment = createAsyncThunk('tasks/addComment', async ({ id, comment }: { id: string; comment: string }) => {
    return await addComment(id, comment);
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.status = 'idle';
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(editTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task:any) => task._id !== action.payload);
            });
    },
});

export default tasksSlice.reducer;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { addNewTask, editTask, getTasks } from '../Service/tasksSlice';
import { CreateTask } from '../types/Task';
import './TaskForm.css'
const TaskForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const taskToEdit = useSelector((state: RootState) => state.tasks.tasks.find(task => task._id === id));

    const [formData, setFormData] = useState<CreateTask>({
        title: '',
        description: '',
        dueDate: '',
        priority: 'low',
        status: 'to-do',
    });

    useEffect(() => {
        if (taskToEdit) {
            setFormData({
                title: taskToEdit.title,
                description: taskToEdit.description,
                dueDate: taskToEdit.dueDate.split(' ')[0],
                priority: taskToEdit.priority,
                status: taskToEdit.status,
            });
        }
    }, [taskToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await dispatch(editTask({ id, task: formData }));
        } else {
            await dispatch(addNewTask(formData));
        }
        dispatch(getTasks());
        navigate('/');
    };

    return (
        <div className="form-container">
        <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task Title"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Task Description"
                required
            />
            <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
            />
            <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="to-do">To-Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>
            <button type="submit">
                {id ? 'Update Task' : 'Create Task'}
            </button>
        </form>
    </div>
    );
};

export default TaskForm;

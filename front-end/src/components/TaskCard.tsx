import React, { useState } from 'react';
import { Task } from '../types/Task';
import TaskModal from './TaskModal';
import './TaskCard.css';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="task-details">
                <h2>{task.title}</h2>
                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p>Status: {task.status}</p>
                <button onClick={() => setIsModalOpen(true)}>
                    View Details
                </button>
            </div>
            {isModalOpen && <TaskModal task={task} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default TaskCard;

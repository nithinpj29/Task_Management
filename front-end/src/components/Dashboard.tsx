// Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getTasks } from '../Service/tasksSlice';
import TaskCard from './TaskCard';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

const Dashboard: React.FC = () => {
    const [isLoggedIn,setIsLogedIn]=useState<Boolean>(false)
    const dispatch: AppDispatch = useDispatch();
    const tasks =[{taskName:"Task1"}]// useSelector((state: RootState) => state.tasks.tasks);
    const status = useSelector((state: RootState) => state.tasks.status);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getTasks());
        localStorage.getItem("userToken")?setIsLogedIn(true):setIsLogedIn(false)
    },[dispatch])
    if (status === 'loading') return <div>Loading...</div>;
    const handleCreateTask = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isLoggedIn) {
            event.preventDefault(); // Prevent the link from being followed
            alert("You can't create a new task until you log in.");
            navigate("/login")
        }
    };
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Task Dashboard</h1>
            <Link to="/create-task" className="add-task-button" onClick={handleCreateTask}>Add New Task</Link>
            <div className="task-grid">
                {tasks.map((task: any) => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

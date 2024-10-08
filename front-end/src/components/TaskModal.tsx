// TaskModal.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../types/Task';
import { AppDispatch } from '../redux/store';
import { addNewComment, removeTask } from '../Service/tasksSlice';
import './TaskModal.css';
import { useNavigate } from 'react-router-dom';


interface TaskModalProps {
    task: Task;
    onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
    const [isLoggedIn,setIsLogedIn]=useState<Boolean>(false)
    const dispatch: AppDispatch = useDispatch();
    const [comment, setComment] = useState<string>('');
    const navigate=useNavigate();

    useEffect(() => {
        localStorage.getItem("userToken")?setIsLogedIn(true):setIsLogedIn(false)
    },[dispatch])
    const handleAddComment = async () => {
        if(isLoggedIn==true){
            if (comment.trim()) {
                await dispatch(addNewComment({ id: task._id, comment }));
                setComment('');
            }
        }else{
            alert("First You Need To be Login for This Action")
            navigate("/login")
        }
        
    };
const task1={id:"1",title:"abc",description:"fff",dueDate:"hhh",priority:"high",status:"done",comments:["abc"]}// for prototype testing purpose
const onDelete = async () => {
    if(isLoggedIn==true){
        await dispatch(removeTask( task._id));
    }else{
        alert("First You Need To be Login for This Action")
        navigate("/login")
    }
     // Use the task ID for deletion
    onClose(); // Close the modal after deletion (optional)
};
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{task1.title}</h2>
                <p>{task1.description}</p>
                <p>Due Date: {new Date(task1.dueDate).toLocaleDateString()}</p>
                <p>Priority: {task1.priority}</p>
                <p>Status: {task1.status}</p>

                <div className="mt-4">
                    <h3>Comments</h3>
                    {task1.comments.map((c, index) => (
                        <p key={index} className="comment">{c}</p>
                    ))}
                </div>

                <div className="mt-4">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <button onClick={handleAddComment} className="bg-green">
                        Add Comment
                    </button>
                </div>

                <button onClick={onClose} className="bg-orange">
                    Close
                </button>
                <button onClick={onDelete} className="bg-red">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskModal;

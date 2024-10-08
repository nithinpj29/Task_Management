export interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'to-do' | 'in-progress' | 'done';
    comments: string[];
}

export interface CreateTask {
    title: string;
    description: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'to-do' | 'in-progress' | 'done';
}

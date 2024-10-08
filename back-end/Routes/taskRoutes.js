const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { authenticate } = require('../middleware/authMiddleware');

// GET /tasks - Retrieve all tasks with optional filters
router.get('/', async (req, res) => {
    try {
        const { status, priority } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        const tasks = await Task.find(filter);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /tasks/:id - Retrieve a specific task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /tasks - Create a new task
router.post('/', authenticate,async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;
        const newTask = new Task({ title, description, dueDate, priority, status });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /tasks/:id - Update an existing task
router.put('/:id',authenticate, async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, priority, status },
            { new: true }
        );
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id',authenticate, async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /tasks/:id/comments - Add a comment to a task
router.post('/:id/comments',authenticate, async (req, res) => {
    try {
        const { text } = req.body;
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.comments.push({ text });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

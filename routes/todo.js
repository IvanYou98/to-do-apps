import express from "express";
import Todo from "../models/Todo.js";
import authenticateToken from "../middleware/jwtToken.js";

const router = express.Router()

// get to do item by id
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const userId = req.user.username
    try {
        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found.' })
        }

        if (todo.userId != req.user.id) {
            return res.status(403).json({ error: 'Unauthorized access.' })
        }
        res.json(todo)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo.' })
    }
})

// get a list of to do items of current user
router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const todos = await Todo.find({ userId: userId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos.' });
    }
});

// create a to do item
router.post('/', authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    const todo = new Todo({
        title: title,
        description: description,
        userId: userId
    });

    try {
        await todo.save();
        res.status(201).json({ message: 'Todo created successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo.' });
    }
});


// update a to do item
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.user.id;

    try {
        const todo = await Todo.findByIdAndUpdate(id, { title: title, description: description });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found.' });
        }

        if (todo.userId != userId) {
            return res.status(403).json({ error: 'Unauthorized access.' });
        }

        res.json({ message: 'Todo updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo.' });
    }
});


// delete a to do item by id
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const todo = await Todo.findByIdAndRemove(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found.' });
        }

        if (todo.userId != userId) {
            return res.status(403).json({ error: 'Unauthorized access.' });
        }

        res.json({ message: 'Todo deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo.' });
    }
});

export default router

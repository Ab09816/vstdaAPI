// dependencies
const express = require('express');
const morgan = require('morgan');

const app = express();

// Mock data
const todoItems = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/api/TodoItems', (req, res) => {
    res.status(200).json(todoItems);
});

app.get('/api/TodoItems/:todoItemId', (req, res) => {
    const todoItemId = parseInt(req.params.todoItemId);
    const todoItem = todoItems.find(item => item.todoItemId === todoItemId);
    if (todoItem) {
        res.status(200).json(todoItem);
    } else {
        res.status(404).json({ error: 'Todo item not found' });
    }
});

//post route
app.post('/api/TodoItems', (req, res) => {
    const newTodoItem = req.body;
    todoItems.push(newTodoItem);
    res.status(201).json(newTodoItem);
});

//delete route
app.delete('/api/TodoItems/:todoItemId', (req, res) => {
    const todoItemId = parseInt(req.params.todoItemId);
    const index = todoItems.findIndex(item => item.todoItemId === todoItemId);
    if (index !== -1) {
        const deletedItem = todoItems.splice(index, 1)[0];
        res.status(200).json(deletedItem);
    } else {
        res.status(404).json({ error: 'Todo item not found' });
    }
});

//export app
module.exports = app;


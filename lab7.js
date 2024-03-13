const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// user array
let users = [];

// task array
let tasks = [];

app.use(bodyParser.json());

app.post('/signup', (req, res) => { //authenticate user
    const { username, password } = req.body;
    const newUser = { username, password, tasks: [] };
    users.push(newUser);
    res.status(200).json({ message: 'User created successfully' });
});

app.post('/tasks', (req, res) => { //create task
    const { username, title, description, dueDate, category, priority } = req.body;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const newTask = { title, description, dueDate, category, priority, completed: false };
    user.tasks.push(newTask);
    tasks.push(newTask);
    res.status(200).json({ message: 'Task created successfully' });
});

app.put('/tasks/:taskId', (req, res) => { //mark complete
    const { taskId } = req.params;
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    task.completed = true;
    res.json({ message: 'Task marked as completed' });
});

app.get('/tasks/:username', (req, res) => {  //view tasks
    const { username } = req.params;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.tasks);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

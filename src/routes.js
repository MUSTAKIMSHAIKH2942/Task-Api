const express = require('express');
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('./controllers');

const router = express.Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;

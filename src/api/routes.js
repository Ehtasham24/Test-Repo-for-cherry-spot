const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask } = require('../tasks/taskService');

router.get('/tasks', (req, res) => {
  const tasks = getTasks(req.query);
  res.json(tasks);
});

router.post('/tasks', (req, res) => {
  const { title, description, assignee } = req.body;
  const task = createTask(title, description, assignee);
  res.status(201).json(task);
});

router.patch('/tasks/:id', (req, res) => {
  const task = updateTask(Number(req.params.id), req.body);
  res.json(task);
});

module.exports = router;

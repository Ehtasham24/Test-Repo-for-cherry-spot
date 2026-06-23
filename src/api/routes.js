const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../tasks/taskService');

router.get('/tasks', (req, res, next) => {
  try {
    res.json(getTasks(req.query));
  } catch (err) { next(err); }
});

router.get('/tasks/:id', (req, res, next) => {
  try {
    res.json(getTaskById(Number(req.params.id)));
  } catch (err) { next(err); }
});

router.post('/tasks', (req, res, next) => {
  try {
    const task = createTask(req.body.title, req.body.description, req.body.assignee);
    res.status(201).json(task);
  } catch (err) { next(err); }
});

router.patch('/tasks/:id', (req, res, next) => {
  try {
    res.json(updateTask(Number(req.params.id), req.body));
  } catch (err) { next(err); }
});

router.delete('/tasks/:id', (req, res, next) => {
  try {
    res.json(deleteTask(Number(req.params.id)));
  } catch (err) { next(err); }
});

module.exports = router;

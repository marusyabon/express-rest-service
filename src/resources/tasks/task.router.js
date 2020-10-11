const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getByBoardID(req.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.get(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(
    new Task({ ...req.body, boardId: req.boardId })
  );
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  const taskId = await tasksService.remove(req.params.id);
  if (taskId) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;

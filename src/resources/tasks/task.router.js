const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getByBoardID(req.params.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.get(req.params.id);
  res.json(task);
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(
    new Task({ ...req.body, boardId: req.params.boardId })
  );
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.id);
  res.sendStatus(200);
});

module.exports = router;

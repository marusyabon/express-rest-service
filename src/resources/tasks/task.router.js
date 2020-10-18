const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');
const tryCatchWrapper = require('../../common/tryCatchWrapper');

router.route('/').get(
  tryCatchWrapper(async (req, res) => {
    const tasks = await tasksService.getByBoardID(req.boardId);
    res.json(tasks);
  })
);

router.route('/:id').get(
  tryCatchWrapper(async (req, res) => {
    const task = await tasksService.get(req.params.id);
    res.json(task);
  })
);

router.route('/').post(
  tryCatchWrapper(async (req, res) => {
    const task = await tasksService.create(
      new Task({ ...req.body, boardId: req.boardId })
    );
    res.json(task);
  })
);

router.route('/:id').put(
  tryCatchWrapper(async (req, res) => {
    const task = await tasksService.update(req.params.id, req.body);
    res.json(task);
  })
);

router.route('/:id').delete(
  tryCatchWrapper(async (req, res) => {
    await tasksService.remove(req.params.id);
    res.sendStatus(200);
  })
);

module.exports = router;

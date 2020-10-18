const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const tryCatchWrapper = require('../../common/tryCatchWrapper');

router.route('/').get(
  tryCatchWrapper(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
);

router.route('/:id').get(
  tryCatchWrapper(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    if (board) {
      res.json(board);
    } else {
      res.sendStatus(404);
    }
  })
);

router.route('/').post(
  tryCatchWrapper(async (req, res) => {
    const board = await boardsService.create(new Board(req.body));
    res.json(board);
  })
);

router.route('/:id').put(
  tryCatchWrapper(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(board);
  })
);

router.route('/:id').delete(
  tryCatchWrapper(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(200);
  })
);

module.exports = router;

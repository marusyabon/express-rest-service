const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tryCatchWrapper = require('../../common/tryCatchWrapper');

router.route('/').get(
  tryCatchWrapper(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  tryCatchWrapper(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  tryCatchWrapper(async (req, res) => {
    const user = await usersService.create(new User(req.body));
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  tryCatchWrapper(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  tryCatchWrapper(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(200);
  })
);

module.exports = router;

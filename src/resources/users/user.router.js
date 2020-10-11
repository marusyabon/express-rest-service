const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(new User(req.body));
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const userId = await usersService.remove(req.params.id);
  if (userId) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;

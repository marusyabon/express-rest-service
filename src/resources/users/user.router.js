const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users);
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getOneById(req.params.id);
  res.json(user);
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(new User(req.body));
  res.json(user);
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.json(user);
});

router.route('/:id').delete(async (req, res) => {
  await usersService.remove(req.params.id);
  res.sendStatus(200);
});

module.exports = router;

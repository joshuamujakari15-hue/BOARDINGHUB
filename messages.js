const router = require('express').Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  const msg = await Message.create(req.body);
  res.json(msg);
});

router.get('/', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

module.exports = router;

const router = require('express').Router();

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Payment successful (demo)' });
});

module.exports = router;

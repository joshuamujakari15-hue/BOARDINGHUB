const router = require('express').Router();
const Listing = require('../models/Listing');

router.post('/', async (req, res) => {
  const listing = await Listing.create(req.body);
  res.json(listing);
});

router.get('/', async (req, res) => {
  const listings = await Listing.find();
  res.json(listings);
});

module.exports = router;

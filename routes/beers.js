const express = require('express');
const router = express.Router();

const beerCtrl = require('../controllers/beer');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, beerCtrl.createBeer);
router.post('/:id/like', auth, beerCtrl.likeBeer);
router.get('/', auth, beerCtrl.getAllBeers);
router.get('/:id', auth, beerCtrl.getOneBeer);
router.put('/:id', auth, multer, beerCtrl.modifyBeer);
router.delete('/:id', auth, beerCtrl.deleteBeer);

module.exports = router;
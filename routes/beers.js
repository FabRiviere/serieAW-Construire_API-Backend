const express = require('express');
const router = express.Router();

const beerCtrl = require('../controllers/beer');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const validate = require('../middleware/validate-inputs');

router.post('/', auth, multer, validate.beer, beerCtrl.createBeer);
router.post('/:id/like', auth, validate.id, validate.like, beerCtrl.likeBeer);
router.get('/', auth, beerCtrl.getAllBeers);
router.get('/:id', auth, validate.id, beerCtrl.getOneBeer);
router.put('/:id', auth, multer, validate.id, validate.beer, beerCtrl.modifyBeer);
router.delete('/:id', auth, validate.id, beerCtrl.deleteBeer);

module.exports = router;
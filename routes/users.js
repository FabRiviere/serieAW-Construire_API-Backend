const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const validate = require('../middleware/validate-inputs');

// Middleware pour s'incrire
router.post('/signup',validate.user,  userCtrl.signup );

// Middleware pour se connecter
router.post('/login', validate.user, userCtrl.login);

module.exports = router;
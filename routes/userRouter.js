const express = require('express');

const authController = require('./../controller/authController');

const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);


router.get('/signup', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login');
})


module.exports = router;
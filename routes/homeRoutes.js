const express=require('express');
const router= express.Router();
const homeController=require('../controllers/homeController')
const authController=require('../controllers/authControllers');
const passport = require('passport');


function isAuthenticated(req,res,next){
    // this is a middleware to be put in login && signUp page
    // if user tries to go to the url of login or signUp, take them to the home page.
    if (req.isAuthenticated()) {
        res.redirect('/todos');
    }
    else{
        next();
    }
}

function setCacheControl(req, res, next) {
    // this is to not store any cache so that the user cant go back after logout
    res.setHeader('Cache-Control', 'no-store');
    next();
}

router.get('/', homeController.getHomePage);
router.get('/login', isAuthenticated, authController.getLogin);
router.post('/login',authController.login, passport.authenticate('local', {
    successRedirect: '/todos',
    failureRedirect: '/login'
}));
router.post('/logout',authController.logout);
router.get('/signup', setCacheControl , isAuthenticated, authController.getSignUp);
router.post('/signup',authController.signUp);

module.exports=router;
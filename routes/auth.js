/*
    path:api/login 


*/

const { Router } = require('express');
const {check} = require('express-validator');

const { createUser, loginUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();



router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(), 
    validateFields
], createUser);


//post: /
//validar email y password
router.post('/',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(), 
    validateFields
], loginUser);


module.exports = router;
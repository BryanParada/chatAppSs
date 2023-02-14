const {response} = require('express');
const {validationResult} = require('express-validator');

const createUser = (req, res = response) => {


   

    res.json({
        ok: true,
        msg: 'Create user!!!!!'
    });


}


module.exports = {createUser};
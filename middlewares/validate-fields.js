
const {validationResult} = require('express-validator');

//callback next que si todo sale bien continuara con el siguiente middleware
const validateFields = (req, res, next) =>{

    const errors = validationResult(req);

    if( !errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        })
    }
//callback next que si todo sale bien continuara con el siguiente middleware
    next();


}


module.exports = {
    validateFields
}
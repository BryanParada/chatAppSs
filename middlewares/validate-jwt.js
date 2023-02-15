

const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) =>{

    //Leer token
    const token = req.header('x-token');

    //console.log(token);
    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the request'
        });
    }

    try {

        const { uid } = jwt.verify( token , process.env.JWT_KEY);
        req.uid = uid; 
        
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    }


};

module.exports = { validateJWT}
const {response} = require('express');
const User = require('../models/user')

const createUser = async (req, res = response) => {

    const {email} = req.body;

    try {

        const emailExists = await User.findOne({email: email});
        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'Mail already exists' //solo a modo de ejemplo, NUNCA deberiamos informar si un correo fue utilizado, sino utilizar "credenciales invalidas"
            })
        }

        const user = new User(req.body);

        await user.save();
       
    
        res.json({
            ok: true,
            //body: req.body
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact Admin'
        })
    }




}


module.exports = {createUser};
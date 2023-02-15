const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
 

const createUser = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const emailExists = await User.findOne({email: email});
        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'Mail already exists' //solo a modo de ejemplo, NUNCA deberiamos informar si un correo fue utilizado, sino utilizar "credenciales invalidas"
            })
        }

        const user = new User(req.body);

        //encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt);


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
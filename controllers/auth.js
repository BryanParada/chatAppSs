const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
 

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
       
        //Generar JWT
        const token = await generateJWT( user.id );
    
        res.json({
            ok: true,
            //body: req.body
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact Admin'
        })
    }
 

}

//const login ... req, res...
//{ok: true, msg: 'login'}
const loginUser = async (req, res = response) => {
    const { email, password} = req.body;

    try {

        const userDB = await User.findOne({ email });
        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: 'Mail not found' //solo a modo de ejemplo, NUNCA deberiamos informar si un correo fue utilizado, sino utilizar "credenciales invalidas"
            })
        }

        //validar password
        const validPassword = bcrypt.compareSync( password, userDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect Password'  
            })
        }

        //Generar JWT
        const token = await generateJWT(userDB.id);


        res.json({
            ok: true, 
            user: userDB,
            token
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Contact Admin'
        })
        
    }

  

}

const renewToken = async(req, res = response)  =>{

    // const uid del user
    const uid = req.uid
    //console.log(uid)

    //generar nuevo JWT, generarJWT uid
    const token = await generateJWT(uid);

    //Obtener el usuario por el UID, uSER.findById...
    const user = await User.findById(uid);

    res.json({
        ok: true,
        user,
        token
    })

}



module.exports = {createUser, loginUser, renewToken};
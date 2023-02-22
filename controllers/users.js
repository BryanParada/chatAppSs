const {response} = require('express');
const User = require('../models/user');

const getUsers = async ( req, res = response) =>{

    const from = Number( req.query.from ) || 0;

    const users = await User
        .find({ _id: {$ne: req.uid}})
        .sort('-online')
        .skip( from )
        .limit(2)

    //console.log(req.uid);

        // const users = await User
        // .find()
        // .sort('-online'); 

   res.json({
    ok: true,
    users 
   })

}

module.exports = {
    getUsers
}
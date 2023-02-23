const User = require('../models/user')
const Message = require('../models/message')

const userConnected = async ( uid = '') =>{

    const user = await User.findById( uid);
    user.online = true;

    await user.save(); 
    return user;

}

const userDisconnect = async ( uid = '') =>{

    const user = await User.findById( uid);
    user.online = false;

    await user.save(); 
    return user;

}

const storeMessage = async( payload ) =>{

    /*
    {
        from: '',
        to: '',
        message: ''
    }
    */
    try {
        console.log(payload);
        const msg = new Message( payload );
        console.log(msg);
        await msg.save();


        return true;
    } catch (error) {
        console.error(error); // Imprime el error en la consola
        return false;
    }

}
 

module.exports = {
    userConnected,
    userDisconnect,
    storeMessage
};
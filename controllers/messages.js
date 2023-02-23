const Message = require('../models/message');

const getChat = async (req, res) =>{

    const myId = req.uid;
    const messagesFrom = req.params.from; //este from es del argumento en "messages.routes " (router.get('/:from'...)

    const last30 = await Message.find({
        $or: [  { from: myId, to: messagesFrom}, { from: messagesFrom, to: myId}  ]//se debe cumplir una de estas condiciones para que regrese un registro
    })
    .sort({ createdAt: 'desc'})
    .limit(30); //descendente

    // const last30 = await Message.find({
    //     $or: [{from: myId}, {from: messagesFrom}, {to:myId}, {to:messagesFrom} ]
    //   })
    //   .sort({ createdAt: 'desc' })
    //   .limit(30);

    res.json({
        ok: true,
        msg: 'hi messagess',
        // messagesFrom
        messages: last30
    })

}

module.exports = {
    getChat
}
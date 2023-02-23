

const {Schema, model} = require('mongoose');

const MessageSchema = Schema({

    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    msg: {
        type: String,
        required: true
    }
    

}, {//CONFIGURACION ADICIONAL AL ESQUEMA
    timestamps: true
});

MessageSchema.method('toJSON', function(){
    const {__v, _id, ...restOfProperties} = this.toObject();
    return restOfProperties;
});

module.exports = model('Message', MessageSchema);
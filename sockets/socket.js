const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band( 'Queen') );
bands.addBand(new Band( 'Bon Jovi') );
bands.addBand(new Band( 'Mermen') );
bands.addBand(new Band( 'Daikaiju') );

// console.log(bands)

//mensajes de sockets
io.on('connection', client => { 
    console.log('Client connected');
 
    client.on('disconnect', () => {
        console.log('Client disconnected');   
     });

   //   client.on('mensaje', ( payload) =>{
   //      console.log('mensaje!!!', payload);

   //      io.emit( 'mensaje', { admin: 'New message from admin from server'});
   //   });
 
     


  }); 
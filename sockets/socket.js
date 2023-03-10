const { checkJWT } = require('../helpers/jwt');
const {io} = require('../index');
const { userConnected, userDisconnect, storeMessage} = require('../controllers/socket');

// console.log(bands)

//mensajes de sockets
io.on('connection', (client) => { 
    console.log('Client connected');

    //console.log( client.handshake.headers['x-token']);
    
    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);
    //console.log(valid, uid);

    //VERIFICAR autenticacion
    if (!valid){return client.disconnect()};
    console.log('Client authenticated');
    
    //Cliente autenticado
    userConnected(uid);

    // ingresar usuario a sala en particular
    //sala global (todos conectados) io.emit
    //sala privada, client.id
    client.join( uid);

    //Escuchar del cliente el personal-msg
    client.on('personal-msg', async (payload) =>{
      //console.log(payload);
      
      await storeMessage(payload);

      io.to(payload.to).emit('personal-msg', payload);
    });

    //a quien enviar
    //        v
    //client.to(uid).emit('')
    
 
    client.on('disconnect', () => {
        //console.log('Client disconnected');   
        userDisconnect( uid );
     });

   //   client.on('mensaje', ( payload) =>{
   //      console.log('mensaje!!!', payload);

   //      io.emit( 'mensaje', { admin: 'New message from admin from server'});
   //   });
 
     


  }); 
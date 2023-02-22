const { checkJWT } = require('../helpers/jwt');
const {io} = require('../index');
const { userConnected, userDisconnect} = require('../controllers/socket');

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
    
 
    client.on('disconnect', () => {
        //console.log('Client disconnected');   
        userDisconnect( uid );
     });

   //   client.on('mensaje', ( payload) =>{
   //      console.log('mensaje!!!', payload);

   //      io.emit( 'mensaje', { admin: 'New message from admin from server'});
   //   });
 
     


  }); 
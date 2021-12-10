const { io } = require('../index')
// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente Conectado');
    //client.on('event', data => { /* … */ });
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) =>{
        console.log('mensaje', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    })
});
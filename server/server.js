const io = require('socket.io')(5000 , {cors: {origin: "*"}})

io.on('connection' , socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message' , ({recipients , text}) =>{
        recipients.forEach( recipient => {
            const new_recipients = recipients.filter(r => r !== recipient)
            new_recipients.push(id)
            socket.broadcast.to(recipient).emit('recieve-message' , {
                recipients : new_recipients , sender : id , text
            })
        })
    })
})
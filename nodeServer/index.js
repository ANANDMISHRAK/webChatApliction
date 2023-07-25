// Node server which will handle Socket to connection , this is backend

const io = require('socket.io')(8000, { cors: { origin: '*' } });

const users = {};

io.on('connection', socket => {
    // if new user joins, let other users connected to the server know!
    socket.on('new-user-Joined', name => {
        //console.log("new user", name);
        users[socket.id] = name;
        // console.log(users);
        // console.log(users[socket.id])
        socket.broadcast.emit('user-joined', name);
    });
    //


    // jab message send per click kroge to ye backend se send krega or client page ke last me code hai screen pe dikhane ka

    socket.on('send', message => {
        // console.log(users);
        // console.log("ram")
        // console.log(users[socket.id]);
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });


    // jab user chat chorega ga to yani disconnact krega to baki ko notificaton ke liye
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id])
        delete users[socket.id];
    });

})
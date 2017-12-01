export default function(server) {
  const SocketIo = require('socket.io');
  const io = new SocketIo(server);

  let totalConnections = 0;
  let liveConnections = 0;

  io.on('connection', socket => {
    console.log(`new connection: ${socket.id}`);
    totalConnections += 1;
    liveConnections += 1;
    io.sockets.emit('count', {
      total: totalConnections,
      live: liveConnections,
    });

    socket.on('disconnect', reason => {
      console.log(`${socket.id} disconnected because: ${reason}`);
      liveConnections -= 1;
      io.sockets.emit('count', {
        total: totalConnections,
        live: liveConnections,
      });
    });
  });
}

let io;

const initSocket = (httpServer) => {
  io = require('socket.io')(httpServer);
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    // Store the user's socket ID in their session or database for later use
    socket.on('register', (userId) => {
      socket.userId = userId;
      console.log(`User with ID ${userId} registered with socket ID ${socket.id}`);
    });
  });
  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { initSocket, getIo };

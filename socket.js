const socketIo = require('socket.io');
const { Message, User } = require('./models');

const initSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:8080", // Cambia este puerto si tu frontend está en un puerto diferente
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('chat message', async (msg) => {
      try {
        // Crear mensaje en chat
        const message = await Message.create({
          userId: msg.userId,
          content: msg.content
        });

        // Obtener el mensaje con relacion de usuario
        const messageWithUser = await Message.findOne({
          where: { id: message.id },
          include: {
            model: User,
            attributes: ['id', 'name', 'role']
          }
        });

        // Emitir a todos los clientes conectados
        io.emit('chat message', messageWithUser);
      } catch (error) {
        console.error('Error handling chat message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = initSocket;

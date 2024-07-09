const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require('./models').sequelize;
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const { Message, User } = require('./models');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080", // Cambia este puerto si tu frontend está en un puerto diferente
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => console.log('Database synced'));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chat message', async (msg) => {
    try {
      const message = await Message.create({
        userId: msg.userId,
        content: msg.content
      });

      const messageWithUser = await Message.findOne({
        where: { id: message.id },
        include: {
          model: User,
          attributes: ['username']
        }
      });

      io.emit('chat message', messageWithUser);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

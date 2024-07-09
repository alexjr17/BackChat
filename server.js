const express = require('express');
const cors = require('cors');
const http = require('http');
const sequelize = require('./models').sequelize;
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const initSocket = require('./socket'); // Importa la configuración de sockets

const app = express();
const server = http.createServer(app);

// Inicializa el socket
const io = initSocket(server);

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => console.log('Database synced'));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

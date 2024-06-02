var cron = require('node-cron');
var { Op } = require('sequelize');
var models = require('./models')
var { createServer } = require('http');
var { Server } = require('socket.io');
var dotenv = require('dotenv')
dotenv.config();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Allow your frontend to access the server
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.SOCKET_PORT || 5001;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});

const sendReminder = async () => {
  try {
    const now = new Date();
    const sockets = io.sockets.sockets;
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));
    const tasks = await models.Task.findAll({
    logging: console.log,
      where: {
        dueDate: {
          [Op.gte]: startOfDay,
          [Op.lt]: endOfDay,
        },
      },
      include: [{ model: models.User, as: 'user' }] // Assuming Task belongs to User
    });

    console.log("userId", sockets.userId)
    tasks.forEach(task => {
      const userId = task.user.id;
      const sockets = io.sockets.sockets;

      for (const [socketId, socket] of sockets.entries()) {
        if (socket.userId === userId) {
          socket.emit('reminder', {
            message: `Reminder: Your task "${task.title}" is due soon!`,
            task
          });
          break;
        }
      }
    });
  } catch (error) {
    console.log("error", error)
  }
};


cron.schedule('* * * * *', sendReminder); // Runs every hour

console.log('Cron job scheduled.');

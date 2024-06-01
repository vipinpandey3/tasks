var cron = require('node-cron');
var { Op } = require('sequelize');
var models = require('./models')
var { createServer } = require('http');
var { Server } = require('socket.io');
var dotenv = require('dotenv')
dotenv.config();

const httpServer = createServer();
const io = new Server(httpServer);

const PORT = process.env.SOCKET_PORT || 5001;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});

const sendReminder = async () => {
  try {
    const now = new Date();
  const tasks = await models.Task.findAll({
    logging: console.log,
    where: {
      dueDate: {
        [Op.lt]: new Date(now.getTime() + 60 * 60 * 1000), // Due within the next hour
        [Op.gt]: now, // Due after now
      },
    },
    include: [{ model: models.User, as: 'user' }] // Assuming Task belongs to User
  });

  console.log("tasks", tasks)

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

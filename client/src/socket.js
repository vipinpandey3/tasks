import { io } from 'socket.io-client';

const socket = io('http://localhost:5001', {
  query: { userId: localStorage.getItem('user_id') } // Adjust as necessary to get the userId
});

export default socket;

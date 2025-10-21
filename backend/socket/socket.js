import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';
import doctorModel from '../model/doctorModel.js';

// Store connected users and doctors
const connectedUsers = new Map();
const connectedDoctors = new Map();

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // Middleware to authenticate socket connections
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id).select('-password');
      const doctor = await doctorModel.findById(decoded.id).select('-password');
      
      if (user) {
        socket.userId = user._id.toString();
        socket.userType = 'user';
        socket.userData = user;
      } else if (doctor) {
        socket.userId = doctor._id.toString();
        socket.userType = 'doctor';
        socket.userData = doctor;
      } else {
        return next(new Error('User not found'));
      }
      
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`${socket.userType} ${socket.userId} connected`);

    // Join user/doctor to their personal room
    socket.join(socket.userId);

    // Store connection info
    if (socket.userType === 'user') {
      connectedUsers.set(socket.userId, socket);
    } else if (socket.userType === 'doctor') {
      connectedDoctors.set(socket.userId, socket);
    }

    // Handle joining specific rooms (for notifications)
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`${socket.userType} ${socket.userId} joined room ${roomId}`);
    });

    // Handle appointment notifications
    socket.on('sendNotification', (data) => {
      const { targetUserId, message, type } = data;
      io.to(targetUserId).emit('notification', {
        message,
        type,
        timestamp: new Date().toISOString()
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`${socket.userType} ${socket.userId} disconnected`);
      
      if (socket.userType === 'user') {
        connectedUsers.delete(socket.userId);
      } else if (socket.userType === 'doctor') {
        connectedDoctors.delete(socket.userId);
      }
    });
  });

  return io;
};

// Helper functions to emit events
export const notifyUser = (io, userId, message, type = 'info') => {
  io.to(userId).emit('notification', {
    message,
    type,
    timestamp: new Date().toISOString()
  });
};

export const notifyDoctor = (io, doctorId, message, type = 'info') => {
  io.to(doctorId).emit('notification', {
    message,
    type,
    timestamp: new Date().toISOString()
  });
};

export const notifyAppointmentUpdate = (io, userId, doctorId, message, type = 'appointment') => {
  // Notify both user and doctor
  io.to(userId).emit('notification', {
    message,
    type,
    timestamp: new Date().toISOString()
  });
  
  io.to(doctorId).emit('notification', {
    message,
    type,
    timestamp: new Date().toISOString()
  });
};

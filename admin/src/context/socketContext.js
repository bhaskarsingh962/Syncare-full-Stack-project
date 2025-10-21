import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('adminToken');
    
    if (token) {
      // Initialize socket connection
      const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
      token: token
     }
   });

      // Connection event handlers
      newSocket.on('connect', () => {
        console.log('Admin connected to server');
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Admin disconnected from server');
        setIsConnected(false);
      });

      // Notification handler
      newSocket.on('notification', (data) => {
        console.log('Admin received notification:', data);
        setNotifications(prev => [...prev, {
          id: Date.now(),
          ...data
        }]);
      });

      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        newSocket.close();
      };
    }
  }, []);

  // Function to join a room
  const joinRoom = (roomId) => {
    if (socket) {
      socket.emit('joinRoom', roomId);
    }
  };

  // Function to send notification
  const sendNotification = (targetUserId, message, type = 'info') => {
    if (socket) {
      socket.emit('sendNotification', {
        targetUserId,
        message,
        type
      });
    }
  };

  // Function to clear notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Function to remove a specific notification
  const removeNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const value = {
    socket,
    notifications,
    isConnected,
    joinRoom,
    sendNotification,
    clearNotifications,
    removeNotification
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

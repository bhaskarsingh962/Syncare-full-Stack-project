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
    // Get tokens from localStorage
    const adminToken = localStorage.getItem('adminToken');
    const doctorToken = localStorage.getItem('doctorToken');
    
    if (adminToken || doctorToken) {
      // Initialize socket connection
      const newSocket = io(import.meta.env.VITE_BACKEND_URL);

      // Connection event handlers
      newSocket.on('connect', () => {
        console.log('Connected to server');
        setIsConnected(true);
        
        // Register based on token type
        if (adminToken) {
          newSocket.emit('registerAdmin', 'admin');
        } else if (doctorToken) {
          // Get doctor ID from token or localStorage
          const doctorId = localStorage.getItem('doctorId') || 'doctor';
          newSocket.emit('registerDoctor', doctorId);
        }
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
        setIsConnected(false);
      });

      // Notification handler
      newSocket.on('notification', (data) => {
        console.log('Received notification:', data);
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
    clearNotifications,
    removeNotification
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

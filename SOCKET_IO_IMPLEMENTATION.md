# Socket.IO Implementation for Syncare (Prescripto)

This document provides a complete guide for implementing Socket.IO real-time notifications in your healthcare appointment booking platform.

## 🚀 What's Been Implemented

### Backend Changes

1. **Socket.IO Server Setup** (`backend/socket/socket.js`)
   - JWT-based authentication for socket connections
   - User and doctor room management
   - Real-time notification system
   - Connection logging with user/doctor identification

2. **Server Integration** (`backend/server.js`)
   - HTTP server creation for Socket.IO
   - CORS configuration for both client (5173) and admin (5174)
   - Socket.IO instance made available to controllers

3. **Controller Updates** (`backend/controllers/userController.js`)
   - Real-time notifications on appointment booking
   - Real-time notifications on appointment cancellation
   - Doctor and user notification system

### Frontend Changes

1. **Socket Context** (`client/src/context/socketContext.js` & `admin/src/context/socketContext.js`)
   - React context for Socket.IO management
   - Connection state management
   - Notification handling
   - Room joining functionality

2. **Notification Components**
   - `client/src/components/NotificationCenter.jsx`
   - `admin/src/components/NotificationCenter.jsx`
   - Real-time notification display
   - Connection status indicators

3. **Example Integration**
   - `client/src/AppWithSocket.jsx`
   - `admin/src/AppWithSocket.jsx`
   - `client/src/components/SocketExample.jsx`

## 📋 Setup Instructions

### 1. Backend Setup

The Socket.IO dependencies are already installed. The backend is ready to run with:

```bash
cd backend
npm run server
```

### 2. Frontend Setup

Both client and admin already have `socket.io-client` installed. To integrate:

#### For Client App:
1. Replace `client/src/App.jsx` with `client/src/AppWithSocket.jsx`
2. Or manually wrap your App component with `SocketProvider`

#### For Admin App:
1. Replace `admin/src/App.jsx` with `admin/src/AppWithSocket.jsx`
2. Or manually wrap your App component with `SocketProvider`

### 3. Usage Examples

#### Basic Socket.IO Usage in React Components:

```jsx
import { useSocket } from '../context/socketContext';

const MyComponent = () => {
  const { socket, notifications, isConnected, joinRoom, sendNotification } = useSocket();

  // Join a room
  useEffect(() => {
    if (socket && isConnected) {
      joinRoom('user-room');
    }
  }, [socket, isConnected, joinRoom]);

  // Send notification
  const handleSendNotification = () => {
    sendNotification('target-user-id', 'Your message', 'info');
  };

  return (
    <div>
      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
      <p>Notifications: {notifications.length}</p>
    </div>
  );
};
```

## 🔧 Socket.IO Events

### Server-Side Events

1. **Connection Events**
   - `connect` - User/doctor connects
   - `disconnect` - User/doctor disconnects
   - `joinRoom` - Join a specific room

2. **Notification Events**
   - `sendNotification` - Send notification to specific user
   - `notification` - Receive notification (client-side)

### Client-Side Events

1. **Connection Management**
   - Automatic connection on component mount
   - Authentication using JWT token
   - Connection status tracking

2. **Notification Handling**
   - Real-time notification display
   - Notification history
   - Notification management (clear, remove)

## 📡 Real-Time Features

### 1. Appointment Booking Notifications
- When a user books an appointment, the doctor receives instant notification
- User receives confirmation notification

### 2. Appointment Cancellation Notifications
- When a user cancels an appointment, the doctor is notified
- User receives cancellation confirmation

### 3. Connection Status
- Visual indicators for connection status
- Automatic reconnection on network issues

### 4. Room Management
- Users and doctors join their personal rooms using MongoDB _id
- Support for custom room joining

## 🛠️ Backend Logging

The server will log connections like:
```
User 64f8a1b2c3d4e5f6a7b8c9d0 joined room
Doctor 64f8a1b2c3d4e5f6a7b8c9d1 joined room
```

## 🔒 Security Features

1. **JWT Authentication**
   - Socket connections require valid JWT token
   - User/doctor identification through token verification

2. **CORS Configuration**
   - Restricted to localhost:5173 (client) and localhost:5174 (admin)
   - Secure cross-origin communication

## 📱 Notification Types

1. **appointment** - New appointment bookings
2. **success** - Successful operations
3. **cancellation** - Appointment cancellations
4. **info** - General information

## 🎨 UI Components

### NotificationCenter Features:
- Real-time notification display
- Connection status indicator
- Notification badge with count
- Color-coded notification types
- Clear all notifications
- Individual notification removal

## 🚀 Running the Application

1. **Start Backend:**
   ```bash
   cd backend
   npm run server
   ```

2. **Start Client:**
   ```bash
   cd client
   npm run dev
   ```

3. **Start Admin:**
   ```bash
   cd admin
   npm run dev
   ```

## 🔍 Testing Socket.IO

1. Open browser developer tools
2. Check console for connection logs
3. Book/cancel appointments to test notifications
4. Verify real-time updates across different browser tabs

## 📝 Additional Notes

- Socket.IO automatically handles reconnection
- Notifications are stored in component state
- Connection status is tracked in real-time
- All Socket.IO events are logged for debugging

## 🐛 Troubleshooting

1. **Connection Issues:**
   - Check if backend is running on port 4000
   - Verify JWT token in localStorage
   - Check CORS settings

2. **Notification Issues:**
   - Ensure user/doctor is connected
   - Check if target user/doctor is online
   - Verify room joining

3. **Authentication Issues:**
   - Verify JWT token validity
   - Check token expiration
   - Ensure proper token storage

This implementation provides a robust real-time notification system for your healthcare platform with minimal code changes and maximum functionality.

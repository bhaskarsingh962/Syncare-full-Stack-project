# Socket.IO Implementation for Syncare (Prescripto)

This document provides a complete guide for the new Socket.IO real-time notification system implemented in your healthcare appointment booking platform.

## 🚀 What's Been Implemented

### Backend Changes

1. **Socket.IO Server Setup** (`backend/socket/socket.js`)
   - **Single IO Instance**: Centralized Socket.IO server with global user mappings
   - **Simple Registration System**: `registerUser`, `registerDoctor`, `registerAdmin` events
   - **Global Mappings**: Central tracking of online users, doctors, and admins
   - **Automatic Cleanup**: Connection cleanup on disconnect to prevent memory leaks
   - **CORS Configuration**: Open CORS policy for development (`origin: "*"`)

2. **Server Integration** (`backend/server.js`)
   - **Single IO Instance**: One Socket.IO server instance shared across the application
   - **Global Mappings**: `onlineUsers`, `onlineDoctors`, `onlineAdmins` made available to controllers
   - **Controller Access**: Socket.IO instance and mappings accessible via `app.set()`

3. **Controller Updates**
   - **User Controller** (`backend/controllers/userController.js`): Real-time notifications for booking, cancellation, payment
   - **Doctor Controller** (`backend/controllers/doctorController.js`): Real-time notifications for completion, cancellation
   - **Admin Controller** (`backend/controllers/adminController.js`): Real-time notifications for admin actions
   - **Enhanced Login**: Login endpoints now return user/doctor IDs along with tokens

### Frontend Changes

1. **Dedicated Socket Files**
   - `client/src/socket.js`: Single shared socket connection for client app
   - `admin/src/socket.js`: Single shared socket connection for admin app
   - **Environment Configuration**: Uses `VITE_BACKEND_URL` with fallback to `http://localhost:4000`

2. **Updated Components with Real-time Features**
   - **Client Components**:
     - `client/src/pages/MyAppointments.jsx`: Real-time appointment updates
     - `client/src/pages/Appointment.jsx`: Real-time slot availability updates
   - **Admin Components**:
     - `admin/src/pages/Doctor/DoctorDashboard.jsx`: Real-time dashboard updates
     - `admin/src/pages/Doctor/DoctorAppointments.jsx`: Real-time appointment list updates
     - `admin/src/pages/Admin/Dashboard.jsx`: Real-time admin dashboard updates
     - `admin/src/pages/Admin/AllAppointments.jsx`: Real-time appointment management

3. **Legacy Context Support**
   - `client/src/context/socketContext.js`: Legacy context (still functional)
   - `admin/src/context/socketContext.js`: Legacy context (still functional)
   - `client/src/components/NotificationCenter.jsx`: Real-time notification display
   - `admin/src/components/NotificationCenter.jsx`: Real-time notification display

## 📋 Setup Instructions

### 1. Backend Setup

The Socket.IO dependencies are already installed. The backend is ready to run with:

```bash
cd backend
npm run server
```

### 2. Frontend Setup

Both client and admin already have `socket.io-client` installed. The new implementation is ready to use:

#### Environment Variables:
Create `.env` files in both `client/` and `admin/` directories:

```bash
# client/.env and admin/.env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id  # Optional, for payments
```

#### For Client App:
1. Use `client/src/AppWithSocket.jsx` (includes SocketProvider)
2. Components automatically use the new socket implementation

#### For Admin App:
1. Use `admin/src/AppWithSocket.jsx` (includes SocketProvider)
2. Components automatically use the new socket implementation

### 3. Usage Examples

#### New Socket.IO Usage in React Components:

```jsx
import React, { useEffect, useState } from 'react';
import socket from '../socket';

const MyComponent = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (userId) {
      // Register user when component mounts
      socket.emit("registerUser", userId);

      // Listen for real-time notifications
      socket.on("notification", (data) => {
        console.log("Received notification:", data);
        setNotifications(prev => [data, ...prev]);
        
        // Refresh data when relevant notifications arrive
        if (data.type === 'appointment' || data.type === 'cancellation') {
          // Trigger data refresh
        }
      });

      // Cleanup listeners when unmounted
      return () => {
        socket.off("notification");
      };
    }
  }, [userId]);

  return (
    <div>
      <p>Notifications: {notifications.length}</p>
      {/* Component content */}
    </div>
  );
};
```

#### Legacy Context Usage (Still Supported):

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
   - `connect` - Socket connection established
   - `disconnect` - Socket disconnection with automatic cleanup

2. **Registration Events**
   - `registerUser` - Register user with userId
   - `registerDoctor` - Register doctor with doctorId
   - `registerAdmin` - Register admin with 'admin'

3. **Notification Events**
   - `notification` - Emit notifications to specific users

### Client-Side Events

1. **Connection Management**
   - Automatic connection using dedicated socket files
   - Environment-based backend URL configuration
   - Connection status tracking

2. **Registration Management**
   - Automatic user/doctor/admin registration on component mount
   - User/doctor ID storage in localStorage after login
   - Proper cleanup on component unmount

3. **Notification Handling**
   - Real-time notification display
   - Automatic UI updates without page refresh
   - Notification history management
   - Data refresh triggers based on notification types

## 📡 Real-Time Features

### 1. Appointment Booking Notifications
- **User Action**: When a user books an appointment
- **Real-time Updates**: 
  - Doctor receives instant notification
  - User receives confirmation notification
  - UI updates immediately without page refresh
  - Available slots update in real-time

### 2. Appointment Cancellation Notifications
- **User Cancellation**: When a user cancels an appointment
- **Doctor Cancellation**: When a doctor cancels an appointment
- **Admin Cancellation**: When admin cancels an appointment
- **Real-time Updates**: All parties receive instant notifications

### 3. Payment Processing Notifications
- **Payment Success**: When payment is completed via Razorpay
- **Real-time Updates**: Both user and doctor receive payment confirmations
- **UI Updates**: Payment status updates immediately

### 4. Appointment Completion Notifications
- **Doctor Action**: When doctor marks appointment as completed
- **Real-time Updates**: Both user and doctor receive completion notifications
- **Dashboard Updates**: Statistics update in real-time

### 5. Connection Management
- **Automatic Registration**: Users/doctors/admins auto-register on component mount
- **Global Tracking**: Central server tracking of all online users
- **Automatic Cleanup**: Connection cleanup on disconnect prevents memory leaks
- **Environment Configuration**: Flexible backend URL configuration

## 🛠️ Backend Logging

The server will log connections like:
```
Socket connected: abc123def456
User 64f8a1b2c3d4e5f6a7b8c9d0 connected → abc123def456
Doctor 64f8a1b2c3d4e5f6a7b8c9d1 connected → def456ghi789
Admin admin connected → ghi789jkl012
Socket disconnected: abc123def456
```

## 🔒 Security Features

1. **Simplified Authentication**
   - No JWT authentication middleware (simplified for development)
   - User/doctor/admin identification through registration events
   - Environment-based configuration

2. **CORS Configuration**
   - Open CORS policy (`origin: "*"`) for development
   - Configurable for production environments
   - Secure cross-origin communication

## 📱 Notification Types

1. **appointment** - New appointment bookings
2. **cancellation** - Appointment cancellations
3. **completion** - Appointment completions
4. **payment** - Payment confirmations
5. **success** - General success messages
6. **info** - General information messages

## 🎨 UI Components

### Updated Components with Real-time Features:
- **MyAppointments.jsx**: Real-time appointment list updates
- **Appointment.jsx**: Real-time slot availability updates
- **DoctorDashboard.jsx**: Real-time dashboard statistics updates
- **DoctorAppointments.jsx**: Real-time appointment management
- **AdminDashboard.jsx**: Real-time admin statistics updates
- **AllAppointments.jsx**: Real-time appointment management

### NotificationCenter Features (Legacy):
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

1. **Open multiple browser tabs** with different user types (user, doctor, admin)
2. **Check browser console** for connection logs:
   ```
   Socket connected: abc123def456
   User 64f8a1b2c3d4e5f6a7b8c9d0 connected → abc123def456
   ```
3. **Test real-time features**:
   - Book appointments and verify instant notifications
   - Cancel appointments and verify real-time updates
   - Make payments and verify payment confirmations
   - Complete appointments and verify completion notifications
4. **Verify UI updates** happen instantly without page refresh
5. **Test cross-browser communication** between different user types

## 📝 Additional Notes

- **Single Socket Connection**: Each app uses one shared socket connection
- **Automatic Registration**: Users/doctors/admins auto-register on component mount
- **Global User Tracking**: Server maintains global mappings of online users
- **Memory Leak Prevention**: Proper cleanup of socket listeners on component unmount
- **Environment Configuration**: Flexible backend URL configuration via environment variables
- **Legacy Support**: Old context-based implementation still functional

## 🐛 Troubleshooting

1. **Connection Issues:**
   - Check if backend is running on port 4000
   - Verify `VITE_BACKEND_URL` environment variable is set correctly
   - Check CORS settings allow localhost:5173 and localhost:5174
   - Ensure WebSocket connections are not blocked by firewall
   - Check browser console for Socket.IO connection errors
   - Verify socket.js files are properly imported in components

2. **Real-time Notifications Not Working:**
   - Ensure user/doctor/admin IDs are stored in localStorage after login
   - Check if components are properly registering with Socket.IO
   - Verify socket listeners are not being removed prematurely
   - Check if notification events are being emitted from backend controllers
   - Ensure proper cleanup of socket listeners on component unmount
   - Check browser console for Socket.IO event logs

3. **UI Not Updating:**
   - Verify React state updates are triggered by notification events
   - Check if data refresh functions are being called
   - Ensure components are properly re-rendering on state changes
   - Verify notification types match expected values

4. **Environment Issues:**
   - Check `.env` files exist in both client and admin directories
   - Verify `VITE_BACKEND_URL` is set correctly
   - Ensure environment variables are loaded properly

This implementation provides a robust, scalable real-time notification system for your healthcare platform with improved architecture, better performance, and enhanced user experience.

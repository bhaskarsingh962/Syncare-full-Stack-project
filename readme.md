# 🏥 Syncare (Prescripto)

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

> **Modern healthcare appointment booking platform** connecting patients with verified doctors through a seamless, secure, and user-friendly interface.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd prescripto

# Install dependencies
cd backend && npm install
cd ../client && npm install  
cd ../admin && npm install

# Start development servers
cd ../backend && npm run server &
cd ../client && npm run dev &
cd ../admin && npm run dev
```

## 📱 Application Overview

This monorepo contains three interconnected applications:

| App | Purpose | Tech Stack | Port | Live Demo |
|-----|---------|------------|------|-----------|
| **Backend** | REST API Server | Node.js, Express, MongoDB | `4000` | N/A |
| **Client** | Patient Portal | React 19, Vite, Tailwind | `5173` | [Visit Client Portal](https://syncare-client.onrender.com/) |
| **Admin** | Admin/Doctor Portal | React 19, Vite, Tailwind | `5174` | [Visit Admin Portal](https://syncare-admin.onrender.com) |


### ✨ Key Features

- 🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing
- 👨‍⚕️ **Doctor Management** - Complete doctor profiles with specialties and availability
- 📅 **Smart Scheduling** - Real-time appointment booking with slot management
- 💳 **Payment Integration** - Razorpay payment gateway (ready for implementation)
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🖼️ **File Uploads** - Cloudinary integration for profile images
- 🔔 **Real-time Notifications** - Socket.IO powered live notifications for appointment updates
- ⚡ **Real-time Communication** - Instant doctor-patient notifications via WebSocket connections

---

## Tech Stack

- Backend: Node.js, Express 5, Mongoose 8, JWT, bcrypt, Multer, Cloudinary, CORS, dotenv, Socket.IO
- Frontend: React 19, Vite, React Router, React Toastify, Tailwind CSS 4, Socket.IO Client
- Database: MongoDB (Atlas or self-hosted)
- Payments: Razorpay SDK (optional)
- Real-time: Socket.IO for live notifications and WebSocket communication

---

## Repository Structure

```text
prescripto/
  admin/                 # Admin/Doctor portal (React + Vite)
  backend/               # REST API server (Express + MongoDB + Socket.IO)
  client/                # Patient web app (React + Vite)
  readme.md
```

---

## Prerequisites

- Node.js 18+ and npm 9+
- MongoDB connection string (Atlas or local)
- Cloudinary account (for image uploads)
- Razorpay keys (if enabling payments)

---

## Environment Variables

Create a `.env` file inside `backend/` with the following keys:

```bash
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=replace-with-strong-secret
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# Optional – Payments (if used)
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
BASE_URL=http://localhost:4000
```

For local development, the frontends typically expect the API at `http://localhost:4000`.

### Frontend Environment Variables

Create `.env` files in both `client/` and `admin/` directories:

```bash
# client/.env and admin/.env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id  # Optional, for payments
```

The `VITE_BACKEND_URL` is used by the Socket.IO client connections and API calls.

---

## Installation

From repository root, install each workspace:

```bash
# backend
cd backend
npm install

# client
cd ../client
npm install

# admin
cd ../admin
npm install
```

---

## Running Locally

Open three terminals (or run in background on your OS). Paths shown from repo root.

```bash
# 1) Backend API
cd backend
npm run server    # uses nodemon
# or: npm start   # plain node

# 2) Client (patient app)
cd ../client
npm run dev

# 3) Admin/Doctor portal
cd ../admin
npm run dev
```

Default dev servers:
- Backend: `http://localhost:4000`
- Client: `http://localhost:5173` (by Vite)
- Admin: `http://localhost:5174` (Vite may select a nearby port)

---

## Available Scripts

```bash
# backend
npm run server   # nodemon dev server
npm start        # prod-like start (node)

# client/admin (both)
npm run dev      # start Vite dev server
npm run build    # production build
npm run preview  # local preview of built app
npm run lint     # run eslint
```

---

## Backend – API Overview

Routes live under `backend/routes` and are handled by controllers in `backend/controllers` with auth middlewares under `backend/middlewares`.

High-level route groups:

- `userRoute.js` – user auth, profile, appointments
- `doctorRoute.js` – doctor auth, profile, slots, appointments
- `adminRoute.js` – admin actions (onboard doctor, lists, etc.)

> Note: Exact endpoints may evolve; open the files to review current handlers before integrating. Authentication uses JWT via `authUser`, `authDoctor`, and `authAdmin` middlewares.

---

## Data Models (MongoDB via Mongoose)

### 📊 Database Schema Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              SYNCARE DATABASE SCHEMA                           │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     USERS       │    │    DOCTORS      │    │  APPOINTMENTS   │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ _id: ObjectId   │    │ _id: ObjectId   │    │ _id: ObjectId   │
│ name: String    │    │ name: String    │    │ userId: String  │◄──┐
│ email: String   │    │ email: String   │    │ docId: String   │◄──┤
│ password: String│    │ password: String│    │ slotDate: String│   │
│ image: String   │    │ image: String   │    │ slotTime: String│   │
│ address: Object │    │ speciality: Str │    │ userData: Object│   │
│ gender: String  │    │ degree: String  │    │ docData: Object │   │
│ dob: String     │    │ experience: Str │    │ amount: Number  │   │
│ phone: String   │    │ about: String   │    │ date: Number    │   │
└─────────────────┘    │ available: Bool │    │ cancelled: Bool │   │
                       │ fees: Number    │    │ payment: Bool   │   │
                       │ address: Object │    │ isCompleted: Bool│  │
                       │ date: Number    │    └─────────────────┘   │
                       │ slots_booked:   │                          │
                       │   Object        │                          │
                       └─────────────────┘                          │
                                                                     │
                       ┌─────────────────┐                          │
                       │   RELATIONSHIPS │                          │
                       ├─────────────────┤                          │
                       │                 │                          │
                       │ Users ────────┐ │                          │
                       │               │ │                          │
                       │ Doctors ──────┼─┼──────────────────────────┘
                       │               │ │
                       │ Appointments ─┘ │
                       │                 │
                       │ • One User can  │
                       │   have many     │
                       │   Appointments  │
                       │                 │
                       │ • One Doctor    │
                       │   can have many │
                       │   Appointments  │
                       │                 │
                       │ • Each          │
                       │   Appointment   │
                       │   belongs to    │
                       │   one User and  │
                       │   one Doctor    │
                       └─────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              FIELD DESCRIPTIONS                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ USERS TABLE:                                                                    │
│ • name: Full name of the patient                                               │
│ • email: Unique email for login (indexed)                                      │
│ • password: Bcrypt hashed password                                             │
│ • image: Base64 data URL or Cloudinary URL                                     │
│ • address: {line1: String, line2: String}                                      │
│ • gender: "Male", "Female", "Other", or "Not Selected"                        │
│ • dob: Date of birth in string format                                          │
│ • phone: Contact number                                                        │
│                                                                                 │
│ DOCTORS TABLE:                                                                  │
│ • name: Full name of the doctor                                                │
│ • email: Unique email for login (indexed)                                      │
│ • password: Bcrypt hashed password                                             │
│ • image: Profile picture URL                                                   │
│ • speciality: Medical specialization                                           │
│ • degree: Medical qualifications                                               │
│ • experience: Years of experience                                               │
│ • about: Doctor's bio/description                                              │
│ • available: Boolean for appointment availability                              │
│ • fees: Consultation fee in currency                                           │
│ • address: Practice location details                                           │
│ • date: Registration timestamp                                                  │
│ • slots_booked: Object tracking booked time slots                              │
│                                                                                 │
│ APPOINTMENTS TABLE:                                                             │
│ • userId: Reference to Users._id                                                │
│ • docId: Reference to Doctors._id                                               │
│ • slotDate: Appointment date                                                    │
│ • slotTime: Appointment time                                                    │
│ • userData: Snapshot of user info at booking time                              │
│ • docData: Snapshot of doctor info at booking time                             │
│ • amount: Total fee for the appointment                                         │
│ • date: Booking timestamp                                                       │
│ • cancelled: Boolean flag for cancellation                                     │
│ • payment: Boolean flag for payment status                                      │
│ • isCompleted: Boolean flag for appointment completion                          │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### User

```js
name: String (required)
email: String (required, unique)
password: String (required)  // hashed at rest
image: String (data URL default)
address: { line1: String, line2: String }
gender: String (default: "Not Selected")
dob: String (default: "Not Selected")
phone: String (default: '0000000000')
```

### Doctor

```js
name: String (required)
email: String (required, unique)
password: String (required)
image: String
speciality: String (required)
degree: String (required)
experience: String (required)
about: String (required)
available: Boolean (default: true)
fees: Number (required)
address: Object (required)
date: Number (required)
slots_booked: Object (default: {})
```

### Appointment

```js
userId: String (required)
docId: String (required)
slotDate: String (required)
slotTime: String (required)
userData: Object (required)
docData: Object (required)
amount: Number (required)
date: Number (required)
cancelled: Boolean (default: false)
payment: Boolean (default: false)
isCompleted: Boolean (default: false)
```

---

## 🔌 Socket.IO Real-time Features

### Real-time Notifications System

The platform includes a robust Socket.IO implementation for instant communication between patients, doctors, and admins:

#### Backend Socket.IO Architecture
- **Single IO Instance**: Centralized Socket.IO server with global user mappings
- **User Registration**: Simple registration system with `registerUser`, `registerDoctor`, `registerAdmin` events
- **Global Mappings**: Central tracking of online users, doctors, and admins
- **Real-time Notifications**: Instant notifications for all appointment-related actions
- **Connection Management**: Automatic cleanup on disconnect to prevent memory leaks

#### Frontend Socket.IO Implementation
- **Dedicated Socket Files**: Single shared socket connection per app (`client/src/socket.js`, `admin/src/socket.js`)
- **Direct Socket Usage**: Components directly import and use socket instance
- **Auto-registration**: Automatic user/doctor/admin registration on component mount
- **Real-time UI Updates**: Instant React state updates without page refresh
- **Proper Cleanup**: Socket listeners properly removed on component unmount

#### Key Socket.IO Events
```javascript
// Client-side events
- 'registerUser' - Register user with userId
- 'registerDoctor' - Register doctor with doctorId  
- 'registerAdmin' - Register admin with 'admin'
- 'notification' - Receive real-time notifications

// Server-side events
- 'connect' - Socket connection established
- 'disconnect' - Socket disconnection with cleanup
- 'notification' - Emit notifications to specific users
```

#### Real-time Features
- **Appointment Booking**: Instant notifications to both user and doctor
- **Appointment Cancellation**: Real-time updates for all parties (user, doctor, admin)
- **Payment Processing**: Instant payment confirmation notifications
- **Appointment Completion**: Real-time completion status updates
- **Admin Actions**: Live notifications for admin-initiated changes

#### Socket.IO Files Structure
```
backend/
  socket/
    socket.js              # Centralized Socket.IO server with global mappings
  controllers/
    userController.js      # Socket.IO notifications for booking, cancellation, payment
    doctorController.js    # Socket.IO notifications for completion, cancellation
    adminController.js     # Socket.IO notifications for admin actions
  server.js                # Single IO instance with global mappings

client/src/
  socket.js                # Dedicated socket connection file
  pages/
    MyAppointments.jsx     # Real-time appointment updates
    Appointment.jsx        # Real-time slot availability updates
  context/
    socketContext.js       # Legacy context (still functional)

admin/src/
  socket.js                # Dedicated socket connection file
  pages/
    Doctor/
      DoctorDashboard.jsx  # Real-time dashboard updates
      DoctorAppointments.jsx # Real-time appointment list updates
    Admin/
      Dashboard.jsx        # Real-time admin dashboard updates
      AllAppointments.jsx  # Real-time appointment management
  context/
    socketContext.js       # Legacy context (still functional)
```

#### Implementation Example
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

#### Real-time Notification Types
- **appointment**: New appointment bookings
- **cancellation**: Appointment cancellations
- **completion**: Appointment completions
- **payment**: Payment confirmations
- **success**: General success messages
- **info**: General information messages

---

## Frontend Apps

Both `client` and `admin` are Vite + React apps and share similar DX.

### Client (`client/`)

- Routing via `react-router-dom`
- Contexts under `client/src/context`
- Components under `client/src/components`
- Tailwind CSS 4 (see `tailwind.config.js`)

### Admin (`admin/`)

- Role-based UI for doctors/admins
- Shared patterns: React Router, context providers, Tailwind styling

---

## Assets and Branding

- Patient logo path: `client/src/assets/assets_client/logoWeb.png`
- Admin logo path: `admin/src/assets/assets_admin/adminWebLogo.png`

Replace those files to update branding (favicons reference the client logo by default).

---

## Dependency Manifests

### Backend

```json
{
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cloudinary": "^2.7.0",
    "cors": "^2.8.5",
    "dotenv": "^17.0.0",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.16.1",
    "multer": "^2.0.1",
    "nodemon": "^3.1.10",
    "razorpay": "^2.9.6",
    "socket.io": "^4.8.1",
    "socket.io-client": "^4.8.1",
    "validator": "^13.15.15"
  }
}
```

### Client

```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.10",
    "axios": "^1.10.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.2",
    "react-toastify": "^11.0.5",
    "socket.io-client": "^4.8.1"
  }
}
```

### Admin

```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.11",
    "axios": "^1.10.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.3",
    "react-toastify": "^11.0.5",
    "socket.io-client": "^4.8.1",
    "tailwindcss": "^4.1.11"
  }
}
```

> Dev dependencies for linting/build are present in each app; see respective `package.json` files.

---

## Production Build

```bash
# Client
cd client && npm run build && npm run preview

# Admin
cd ../admin && npm run build && npm run preview

# Backend (run with process manager like PM2 in production)
cd ../backend && npm start
```

Serve the built frontends (from `dist/`) behind your preferred reverse proxy (Nginx, Caddy) and point them to the live API URL.

---

## Testing (Manual)

- Start backend and frontends
- Register/login as a user and as a doctor
- Create a test appointment, verify status changes and listing in both apps
- Upload a profile/doctor image to validate Cloudinary configuration

---

## Troubleshooting

- API not reachable: Verify `PORT`, firewall, and that `CORS` is enabled
- Mongo connection fails: Check `MONGODB_URI` string and network access (Atlas IP allowlist)
- Images not uploading: Confirm Cloudinary credentials and Multer form field names
- JWT errors: Ensure `JWT_SECRET` is set and tokens are sent in `Authorization: Bearer <token>` header
- Vite port conflicts: Vite will auto-pick a new port; look at terminal output
- **Socket.IO connection issues:**
  - Check if backend is running on port 4000
  - Verify `VITE_BACKEND_URL` environment variable is set correctly
  - Check CORS settings allow localhost:5173 and localhost:5174
  - Ensure WebSocket connections are not blocked by firewall
  - Check browser console for Socket.IO connection errors
  - Verify socket.js files are properly imported in components
- **Real-time notifications not working:**
  - Ensure user/doctor/admin IDs are stored in localStorage after login
  - Check if components are properly registering with Socket.IO
  - Verify socket listeners are not being removed prematurely
  - Check if notification events are being emitted from backend controllers
  - Ensure proper cleanup of socket listeners on component unmount
  - Check browser console for Socket.IO event logs

---

## Security Notes

- Never commit real `.env` values
- Use strong `JWT_SECRET` and rotate periodically
- Validate/limit upload types and sizes in Multer
- Enforce HTTPS and secure cookies in production

---

## 🚀 Deployment

### Docker Deployment (Recommended)

Create a `docker-compose.yml` in the root directory:

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
    depends_on:
      - mongo

  client:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

  admin:
    build: ./admin
    ports:
      - "81:80"
    depends_on:
      - backend

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### Manual Deployment

#### Backend (Node.js)
```bash
# Production build
cd backend
npm ci --only=production
npm start

# With PM2 (recommended)
npm install -g pm2
pm2 start server.js --name "syncare-backend"
pm2 startup
pm2 save
```

#### Frontend (Static Files)
```bash
# Build client
cd client
npm run build
# Serve dist/ folder with Nginx/Apache

# Build admin
cd admin  
npm run build
# Serve dist/ folder with Nginx/Apache
```

### Environment Variables for Production

```bash
# Backend .env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/syncare?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
BASE_URL=https://your-domain.com
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Doctor registration and profile setup
- [ ] Appointment booking flow
- [ ] Payment integration (if enabled)
- [ ] File upload functionality
- [ ] Admin panel access and doctor management
- [ ] Responsive design on mobile/tablet
- [ ] Error handling and validation
- [ ] **Socket.IO real-time notifications**
  - [ ] User connects and registers with Socket.IO
  - [ ] Doctor connects and registers with Socket.IO
  - [ ] Admin connects and registers with Socket.IO
  - [ ] Appointment booking triggers real-time notifications to both user and doctor
  - [ ] Appointment cancellation triggers real-time notifications to all parties
  - [ ] Payment processing triggers real-time notifications
  - [ ] Appointment completion triggers real-time notifications
  - [ ] UI updates instantly without page refresh
  - [ ] Socket listeners are properly cleaned up on component unmount
  - [ ] Cross-browser real-time communication works correctly

### API Testing with Postman

Import the following collection structure:

```json
{
  "info": {
    "name": "Syncare API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {"name": "User Register", "request": {"method": "POST", "url": "{{baseUrl}}/api/user/register"}},
        {"name": "User Login", "request": {"method": "POST", "url": "{{baseUrl}}/api/user/login"}},
        {"name": "Doctor Register", "request": {"method": "POST", "url": "{{baseUrl}}/api/doctor/register"}},
        {"name": "Doctor Login", "request": {"method": "POST", "url": "{{baseUrl}}/api/doctor/login"}}
      ]
    }
  ]
}
```

## 📊 Performance Optimization

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization with WebP format
- Bundle analysis with `npm run build -- --analyze`
- Service worker for offline functionality

### Backend Optimization
- Database indexing on frequently queried fields
- Redis caching for session management
- Rate limiting with express-rate-limit
- Compression middleware for API responses
- Socket.IO single instance architecture with global mappings
- Efficient user/doctor/admin tracking with automatic cleanup
- WebSocket message throttling for high-frequency updates
- Centralized notification system for reduced overhead

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

-**Bhaskar Singh** – *Initial work* – [@bhaskarsingh962](https://github.com/bhaskarsingh962)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the flexible database solution
- Tailwind CSS for the utility-first styling
- Cloudinary for image management services
- All contributors and testers

---

<div align="center">
  <p>Made with ❤️ for better healthcare accessibility</p>
  <p>
    <a href="#-syncare-prescripto">Back to top</a>
  </p>
</div>

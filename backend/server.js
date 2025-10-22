import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { createServer } from 'http';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import initSocket from './socket/socket.js';


//app config
const app = express();
const server = createServer(app);
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Initialize Socket.IO with global mappings
const { io, onlineUsers, onlineDoctors, onlineAdmins } = initSocket(server);

// Make io instance and mappings available to routes
app.set('io', io);
app.set('onlineUsers', onlineUsers);
app.set('onlineDoctors', onlineDoctors);
app.set('onlineAdmins', onlineAdmins);

//middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: true,      // allow any origin
  credentials: true
}));

//api endpoint 
//localhost: 4000/api/admin
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/',(req, res)=> {
    res.send('API WORKING');
})

server.listen(port, () => console.log("Server Started at port", port));

import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//api endpoint 
//localhost: 4000/api/admin
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/',(req, res)=> {
    res.send('API WORKING');
})

app.listen(port, () => console.log("Server Started at port", port));
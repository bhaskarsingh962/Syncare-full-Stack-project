import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import connectCloudinary from "../config/cloudinary.js";
import doctorModel from "../model/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../model/appointmentModel.js";
import userModel from "../model/userModel.js";



//api for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    //connecting for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // check if doctor already exists with same email
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor with this email already exists",
      });
    }

    //validation email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a Valid email",
      });
    }

    //validate strong password
    if (password.length < 8) {
      return res.status(404).json({
        success: false,
        message: "Password must be longer than 8 characters",
      });
    }

    //hashing doctors paswword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //uplaod image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = await doctorModel.create(doctorData);

    return res.status(200).json({
      success: "true",
      message: "Doctor added succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({
        success: "false",
        message: "Invalid credential",
      });
    }

    const token = jwt.sign(email + password, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};


// Api to grt all doctors list for admin panel
const allDoctor = async (req, res) => {
    try {
        
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) { 
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


//API to get all appointment list
const appointmentAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});

    res.json({
      success: true,
      appointments,
    })
  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:error.message
    })
  }
}

//API appointment cancellation
const appointmentCancel = async(req, res) => {
  try {
    const { appointmentId} = req.body

    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});

    //relasing doctor slot
    const {docId, slotDate, slotTime, userId} = appointmentData;
    
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

    await doctorModel.findByIdAndUpdate(docId, {slots_booked})

    // Emit Socket.IO notification for admin cancellation
    const io = req.app.get('io');
    const onlineDoctors = req.app.get('onlineDoctors');
    const onlineUsers = req.app.get('onlineUsers');
    const onlineAdmins = req.app.get('onlineAdmins');
    
    const doctorSocketId = onlineDoctors[docId];
    const userSocketId = onlineUsers[userId];

    if (doctorSocketId) {
        io.to(doctorSocketId).emit("notification", {
            message: `Appointment cancelled by admin for ${slotDate} at ${slotTime}`,
            type: "cancellation",
        });
    }

    if (userSocketId) {
        io.to(userSocketId).emit("notification", {
            message: `Your appointment on ${slotDate} at ${slotTime} has been cancelled by admin`,
            type: "cancellation",
        });
    }

    res.json({
      success: true,
      message: 'Appointment Cancelled'
    });

  } catch (error) {
     console.log(error);
      res.json({
        success: false,
        message: error.message,
      })
  }
}

//Api to get dashboard data for Admin
const adminDashboard = async (req, res) => {
  try {
    
    const doctors = await doctorModel.find({});
    const user = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: user.length,
      latestAppointment: appointments.reverse().slice(0,5), 
    }

    res.json({
      success: true,
      dashData
    });
  
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: 'error.message',
    })
  }
}



export { addDoctor, loginAdmin, allDoctor, appointmentAdmin, appointmentCancel, adminDashboard};

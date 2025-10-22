import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../model/doctorModel.js";
import appointmentModel from "../model/appointmentModel.js";
import razorpay from 'razorpay';

//API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    //validating emailfromate
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter a valid Email",
      });
    }

    //validating password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a strong Password",
      });
    }

    //hasing use password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    //save this data in user data base
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    //user validation
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    //match password entered by user and from database
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        token,
        userId: user._id,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//Api to get user profile
const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId).select("-password");

    return res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to uplaod user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file?.path;

    console.log("Uploaded image:", imageFile);

    if (!name || !phone || !dob || !gender) {
      return res.json({
        success: false,
        message: "Data Missing",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile, {
        resource_type: "image",
        transformation: [
          { width: 500, height: 500, crop: "limit" },
          { quality: "auto" },
        ],
      });

      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    return res.json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


//API to book appointment
const bookAppointment = async (req, res) => {
    try {
        
        const userId = req.userId;
       
        const {docId, slotDate, slotTime } = req.body
         console.log("Booking request received");
          console.log("Doc ID:", docId);
          console.log("Slot Date:", slotDate);
          console.log("Slot Time:", slotTime);

        const docData = await doctorModel.findById(docId).select('-password');

        if(!docData.available){
            return res.json({
                success: false,
                message:'Doctor not Available'
            })
        }

        let slots_booked = docData.slots_booked

        //checking for slot availablity
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({
                    success: false,
                    message: 'Slot not Available'
                })
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime);
        }

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData) 
        
        await newAppointment.save();
        
        // Emit Socket.IO notification to doctor and user
        const io = req.app.get('io');
        const onlineDoctors = req.app.get('onlineDoctors');
        const onlineUsers = req.app.get('onlineUsers');
        
        const doctorSocketId = onlineDoctors[docId];
        const userSocketId = onlineUsers[userId];

        if (doctorSocketId) {
            io.to(doctorSocketId).emit("notification", {
                message: `New appointment booked for ${slotDate} at ${slotTime}`,
                type: "appointment",
            });
        }

        if (userSocketId) {
            io.to(userSocketId).emit("notification", {
                message: `Appointment booked successfully for ${slotDate} at ${slotTime}`,
                type: "success",
            });
        }
        
        return res.json({
          success: true,
          message: "Appointment booked successfully",
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        })
    }
}


//API to get user appointment for fronted my-appointment page

const listAppointment = async (req, res) => {
   try {
     
     const userId = req.userId;
     const appointments = await appointmentModel.find({userId});

     res.json({
      success: true,
      appointments,
     })
   } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      })
   }
}

//API to cancel appointment
const cancelAppointment = async(req, res) => {
  try {
    const userId = req.userId;
    console.log("get user id", userId)
    const { appointmentId} = req.body
     console.log("get appointment id", appointmentId)
    const appointmentData = await appointmentModel.findById(appointmentId);
    
    //verify appointment user
    if(appointmentData.userId != userId){
      return res.json({
        success: false,
        message: 'Unauthorized action'
      })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});

    //relasing doctor slot
    const {docId, slotDate, slotTime} = appointmentData;
    
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

    await doctorModel.findByIdAndUpdate(docId, {slots_booked})

    // Emit Socket.IO notification
    const io = req.app.get('io');
    const onlineDoctors = req.app.get('onlineDoctors');
    const onlineUsers = req.app.get('onlineUsers');
    
    const doctorSocketId = onlineDoctors[docId];
    const userSocketId = onlineUsers[userId];

    if (doctorSocketId) {
        io.to(doctorSocketId).emit("notification", {
            message: `Appointment cancelled for ${slotDate} at ${slotTime}`,
            type: "cancellation",
        });
    }

    if (userSocketId) {
        io.to(userSocketId).emit("notification", {
            message: `Appointment cancelled successfully`,
            type: "info",
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

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})



//API to make payment of appointment using razorpay
const paymentRazorpay = async(req, res) => {
 try {
   const {appointmentId} = req.body;
   const appointmentData = await appointmentModel.findById(appointmentId);

  if(!appointmentData || appointmentData.cancelled){
    return res.json({
      success: false,
      message: 'Appointment Cancelled or not found'
    });
  }

  // creating options for razorpay payment
  const options = {
    amount: appointmentData.amount * 100,
    currency: process.env.CURRENCY,
    receipt: appointmentId,
  }

  // creating of an order
  const order = await razorpayInstance.orders.create(options)

  res.json({
    success: true,
    order,
  })

 } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      })
  }
}


const verifyRazorpay = async (req, res) => {
  try {
    const {razorpay_order_id} = req.body;
    const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if(orderinfo.status === 'paid'){
      const appointment = await appointmentModel.findByIdAndUpdate(orderinfo.receipt, {payment: true});
      
      // Emit Socket.IO notification for payment success
      const io = req.app.get('io');
      const onlineDoctors = req.app.get('onlineDoctors');
      const onlineUsers = req.app.get('onlineUsers');
      
      const doctorSocketId = onlineDoctors[appointment.docId];
      const userSocketId = onlineUsers[appointment.userId];

      if (doctorSocketId) {
          io.to(doctorSocketId).emit("notification", {
              message: `Payment received for appointment on ${appointment.slotDate} at ${appointment.slotTime}`,
              type: "payment",
          });
      }

      if (userSocketId) {
          io.to(userSocketId).emit("notification", {
              message: `Payment successful for appointment on ${appointment.slotDate} at ${appointment.slotTime}`,
              type: "success",
          });
      }
      
      res.json({
        success: true,
        message: 'Payment Successful',
      })
    }else{
      res.json({
        success: false,
        message: 'Payment Failed'
      })
    }
  } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      })
  }
}



export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay};

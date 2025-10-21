import doctorModel from "../model/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../model/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.status(200).json({
      success: true,
      message: "Availability Changed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid credential",
      });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
        return res.json({
        success: true,
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid credential",
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

//API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.user;
    const appointments = await appointmentModel.find({ docId });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.user;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId == docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "Appointment Completed",
      });
    } else {
      return res.json({
        success: false,
        message: "Mark Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to mark appointment cancel for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.user;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId == docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,
        message: "Appointment Cancelled",
      });
    } else {
      return res.json({
        success: false,
        message: "Cancelled Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Api to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.user;
    const appointments = await appointmentModel.find({ docId });
    let earning = 0;

    appointments.map((item) => {
      if (item.isCompleted && item.amount) {
        earning += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointment: appointments.reverse().slice(0, 5),
    };

    return res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const docId = req.user;
    const profileData = await doctorModel.findById(docId).select("-password");

    if (profileData) {
      res.json({
        success: true,
        profileData,
      });
    } else {
      return res.json({
        success: false,
        message: "Get Appointment Failed",
      });
    }
  } catch (error) {
    console.error();
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.user;

    const { fees, address, available } = req.body;

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    return res.json({
      success: true,
      message: "Profile updated",
    });
  } catch (error) {
    console.error();
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};

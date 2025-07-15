import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : "");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/admin/all-doctors",{},{ headers: { adminToken: adminToken}});
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { adminToken: adminToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error.message;
      toast.error(message);
      console.log("changeAvailability error:", error.response?.data);
    }
  }

  const getAllAppointments = async () => {
    try {
      const {data} = await axios.get(backendUrl+'/api/admin/appointments', {headers: {adminToken}})
      if(data.success){
        setAppointments(data.appointments);
        console.log(data.appointments);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment', {appointmentId}, { headers:{adminToken}});

      if(data.success){
        toast.success(data.message);
        getAllAppointments();
        getDashData();
      }

    } catch (error) {
      toast.error(error.message);
    }
}


 const getDashData = async () => {
  try {
    
    const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers: {adminToken}});

    if(data.success){
      setDashData(data.dashData);
      console.log(data.dashData);
    }else{
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
 } 

 
  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments, setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData, getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

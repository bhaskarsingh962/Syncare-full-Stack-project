import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import socket from '../../socket';

const DoctorDashboard = () => {
  const { doctorToken, dashData, setDashData, getDashData, cancelAppointment , completeAppointment} =
    useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (doctorToken) {
      getDashData();
    }
  }, []);

  // Socket.IO real-time updates
  useEffect(() => {
    const doctorId = localStorage.getItem('doctorId');
    
    if (doctorId && doctorToken) {
      // Register doctor when component mounts
      socket.emit("registerDoctor", doctorId);

      // Listen for real-time notifications
      socket.on("notification", (data) => {
        console.log("Received real-time notification:", data);
        setNotifications((prev) => [data, ...prev]);
        
        // Refresh dashboard data when relevant notifications arrive
        if (data.type === 'appointment' || data.type === 'cancellation' || data.type === 'completion' || data.type === 'payment') {
          getDashData();
        }
      });

      // Cleanup listeners when unmounted
      return () => {
        socket.off("notification");
      };
    }
  }, [doctorToken]);

  return (
    <div className=" m-5">
      <div className=" flex flex-wrap gap-3">
        <div className=" flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className=" w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className=" text-xl font-semibold text-gray-600">
              {currency}
              {dashData.earning}
            </p>
            <p className=" text-gray-400">Earnings</p>
          </div>
        </div>

        <div className=" flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className=" w-14" src={assets.appointment_icon} alt="" />
          <div>
            <p className=" text-xl font-semibold text-gray-600">
              {dashData.appointments}
            </p>
            <p className=" text-gray-400">Appointments</p>
          </div>
        </div>

        <div className=" flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className=" w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className=" text-xl font-semibold text-gray-600">
              {dashData.patients}
            </p>
            <p className=" text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      <div className=" pt-4 border-gray-400 border-t-0">
          {dashData.latestAppointment?.map((item, index) => (
            <div
              className=" flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              key={index}
            >
              <img className=" rounded-full w-10" src={item.userData.image} />
              <div className=" flex-1 text-sm">
                <p className=" text-gray-800 font-medium">
                  {item.userData.name}
                </p>
                <p className=" text-gray-600">
                  {slotDateFormat(item.slotDate)}
                </p>
              </div>

              {
                item.cancelled 
                ? <p className=' text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className=' text-green-500 text-xs font-medium'>Completed</p>
                  : <div className=' flex'>
                      <img onClick={()=> cancelAppointment(item._id)} className=' w-10 cursor-pointer' src={assets.cancel_icon} />
                      <img onClick={()=> completeAppointment(item._id)} className=' w-10 cursor-pointer' src={assets.tick_icon}/>
                    </div>
               }
            </div>
          ))}
        </div>
    </div>
  );
};

export default DoctorDashboard;

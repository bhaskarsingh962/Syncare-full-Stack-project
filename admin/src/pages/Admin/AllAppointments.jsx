import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const AllAppointments = () => {
  const { adminToken, getAllAppointments, appointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
    }
  }, [adminToken]);

  return (
    <div className=" w-full max-w-6xl m-5">
      <p className=" mb-3 text-lg font-medium">All Appointments</p>

      <div className=" bg-white border border-gray-200 rounded min-h-[60vh] text-sm max-h-[80vh] overflow-y-scroll">
        <div className=" hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctors</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className=" flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-indigo-50"
            key={index}
          >
            <p className=" max-sm:hidden">{index}</p>
            <div className=" flex items-center gap-2">
              <img
                className=" w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />{" "}
              <p>{item.userData.name}</p>
            </div>
            <p className=" max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)},{item.slotTime}
            </p>
            <div className=" flex items-center gap-2">
              <img
                className=" w-8 rounded-ful bg-gray-200"
                src={item.docData.image}
                alt=""
              />{" "}
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className=" text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className=" text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className=" w-10 cursor-pointer"
                src={assets.cancel_icon}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;

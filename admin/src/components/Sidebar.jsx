import React, { useContext } from 'react'
import { NavLink } from "react-router-dom"
import {assets} from '../assets/assets_admin/assets'
import {AdminContext} from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'


const Sidebar = () => {

  const {adminToken} = useContext(AdminContext)
  const {doctorToken, setDoctorToken} = useContext(DoctorContext)

  return (
    <div className=' min-h-screen bg-white border-r border-gray-100'>
        {
          adminToken  && <ul className=' text-[#515151] mt-5'>
            <NavLink className={ ({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff]'  : ''}`} to={'/admin-dashboard'}>
             <img src={assets.home_icon} />
             <p className=' hidden md:block'>Dashboard</p>
            </NavLink>

             <NavLink className={ ({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff]'  : ''}`} to={'/all-appointments'}>
             <img src={assets.appointment_icon} />
             <p className=' hidden md:block'>Appointments</p>
            </NavLink>

             <NavLink className={ ({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff]'  : ''}`} to={'/add-doctor'}>
             <img src={assets.add_icon} />
             <p className=' hidden md:block'>Add Doctor</p>
            </NavLink>

             <NavLink className={ ({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff]'  : ''}`} to={'/doctor-list'}>
             <img src={assets.people_icon} />
             <p className=' hidden md:block'>Doctor List</p>
            </NavLink>
          </ul>
        }

        {
          doctorToken  && <ul className=' text-[#515151] mt-5'>
            <NavLink className={ ({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff]'  : ''}`} to={'/doctor-dashboard'}>
             <img src={assets.home_icon} />
             <p className=' hidden md:block'>Dashboard</p>
            </NavLink>

             <NavLink className={ ({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff]'  : ''}`} to={'/doctor-appointments'}>
             <img src={assets.appointment_icon} />
             <p className=' hidden md:block'>Appointments</p>
            </NavLink>

             <NavLink className={ ({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff]'  : ''}`} to={'/doctor-profile'}>
             <img src={assets.add_icon} />
             <p className=' hidden md:block'>Profile</p>
            </NavLink>
          </ul>
        }
    </div>
  )
}

export default Sidebar
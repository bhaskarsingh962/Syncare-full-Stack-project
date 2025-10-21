import React from 'react'
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationCenter from './components/NotificationCenter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SocketProvider } from './context/socketContext';

const App = () => {
  return (
    <SocketProvider>
      <div className=' mx-4 sm:mx-[10%]'>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />}></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />}></Route>
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
        </Routes>
        <Footer />
        
        {/* Add Notification Center to the layout */}
        <div className="fixed top-4 right-4 z-50">
          <NotificationCenter />
        </div>
      </div>
    </SocketProvider>
  )
}

export default App

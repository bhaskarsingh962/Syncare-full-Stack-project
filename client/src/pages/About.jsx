import React from 'react'
import { assets } from '../assets/assets_client/assets'

const About = () => {
  return (
    <div>
      <div className=' text-center text-2xl pt-10 text-gray-500'>
       <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p> 
     </div>
    <div className=' my-10 flex flex-col md:flex-row gap-12'>
      {/* Replaced image with a decorative info panel */}
      <div className='w-full md:max-w-[360px]'>
        <div className='relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-sm'>
          <div className='pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-blue-100 blur-3xl opacity-60'></div>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10 rounded-full bg-[#5f6fff] text-white flex items-center justify-center'>
              <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
              </svg>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Our mission</p>
              <p className='text-gray-800 font-medium'>Care made simple</p>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-3 gap-3'>
            <div className='rounded-lg bg-white p-3 text-center border border-gray-200'>
              <p className='text-xl font-semibold text-gray-800'>250+</p>
              <p className='text-[11px] text-gray-500'>Verified Doctors</p>
            </div>
            <div className='rounded-lg bg-white p-3 text-center border border-gray-200'>
              <p className='text-xl font-semibold text-gray-800'>10k+</p>
              <p className='text-[11px] text-gray-500'>Appointments</p>
            </div>
            <div className='rounded-lg bg-white p-3 text-center border border-gray-200'>
              <p className='text-xl font-semibold text-gray-800'>4.9</p>
              <p className='text-[11px] text-gray-500'>User Rating</p>
            </div>
          </div>

          <div className='mt-6 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2'>
            <svg className='h-4 w-4 text-[#5f6fff]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
            <p className='text-xs text-gray-700'>HIPAA-aware data handling</p>
          </div>
        </div>
      </div>
      <div className=' flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 '>
        <p>Welcome to Syncare, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
        <p>Syncare is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
        <b>Our Vision</b>
        <p>Our vision at Syncare is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
      </div>
    </div>

    <div>
      <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
    </div>
    <div className=' flex flex-col md:flex-row mb-20'>
      <div className=' border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white text-gray-600 cursor-pointer'>
        <b>EFFICIENCY:</b>
        <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
      </div>
      <div className=' border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white text-gray-600 cursor-pointer'>
         <b>CONVENIENCE:</b>
         <p>Access to a network of trusted healthcare professionals in your area.</p>
      </div>
      <div className=' border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white text-gray-600 cursor-pointer'>
         <b>PERSONALIZATION:</b>
         <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
      </div>
    </div>
    </div>
    
  )
}

export default About
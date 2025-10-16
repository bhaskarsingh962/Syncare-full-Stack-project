import React from 'react'
import { assets } from '../assets/assets_client/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-[#1e40af] via-[#3b82f6] to-[#5f6fff] rounded-2xl px-6 md:px-10 lg:px-20 shadow-2xl border border-white/10'>
      {/* Left side - Content */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 m-auto md:py-16'>
        {/* Professional Badge */}
        <div className='flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2'>
          <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
          <span className='text-white text-sm font-medium'>Verified Healthcare Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight'>
          Book Appointment <br/>
          <span className='text-blue-200'>With Trusted Doctors</span>
        </h1>

        {/* Professional Description */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <div className='flex -space-x-2'>
              <div className='w-10 h-10 bg-white rounded-full border-2 border-white flex items-center justify-center'>
                <svg className='w-5 h-5 text-[#5f6fff]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <div className='w-10 h-10 bg-white rounded-full border-2 border-white flex items-center justify-center'>
                <svg className='w-5 h-5 text-[#5f6fff]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <div className='w-10 h-10 bg-white rounded-full border-2 border-white flex items-center justify-center'>
                <svg className='w-5 h-5 text-[#5f6fff]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <div className='w-10 h-10 bg-white rounded-full border-2 border-white flex items-center justify-center'>
                <span className='text-xs font-bold text-[#5f6fff]'>+</span>
              </div>
            </div>
            <div className='text-white/90 text-sm'>
              <p className='font-medium'>100+ Verified Doctors</p>
              <p className='text-white/70'>Board-certified specialists</p>
            </div>
          </div>
          
          <p className='text-white/90 text-lg leading-relaxed max-w-lg'>
            Connect with experienced healthcare professionals and schedule your consultation with confidence. 
            <span className='text-blue-200 font-medium'>Secure, convenient, and professional medical care at your fingertips.</span>
          </p>
        </div>

        {/* Professional Features */}
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div className='flex items-center gap-2 text-white/80 text-sm'>
            <svg className='w-4 h-4 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
            <span>24/7 Available</span>
          </div>
          <div className='flex items-center gap-2 text-white/80 text-sm'>
            <svg className='w-4 h-4 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
            <span>Secure & Private</span>
          </div>
          <div className='flex items-center gap-2 text-white/80 text-sm'>
            <svg className='w-4 h-4 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
            <span>Instant Booking</span>
          </div>
          <div className='flex items-center gap-2 text-white/80 text-sm'>
            <svg className='w-4 h-4 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
            <span>Verified Doctors</span>
          </div>
        </div>

        {/* CTA Button - Keeping original functionality */}
        <a 
          href='#speciality' 
          className='flex items-center gap-3 bg-white text-[#1e40af] px-8 py-4 rounded-full text-base font-semibold m-auto md:m-0 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg border-2 border-white hover:bg-blue-50'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
          </svg>
          Book Appointment
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </a>
      </div>
      
      {/* Right side - Professional Medical Elements */}
      <div className='md:w-1/2 relative flex items-center justify-center p-8'>
        <div className='relative'>
          {/* Central Medical Symbol */}
          <div className='bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30'>
            <div className='w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
              <svg className='w-12 h-12 text-[#1e40af]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
              </svg>
            </div>
            <h3 className='text-white text-xl font-semibold text-center mb-2'>Healthcare Excellence</h3>
            <p className='text-white/80 text-sm text-center'>Professional medical care you can trust</p>
          </div>

          {/* Floating Professional Elements */}
          <div className='absolute -top-6 -left-6 bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-white/20'>
            <div className='w-8 h-8 bg-white rounded-lg flex items-center justify-center'>
              <svg className='w-5 h-5 text-[#1e40af]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>

          <div className='absolute -bottom-6 -right-6 bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-white/20'>
            <div className='w-8 h-8 bg-white rounded-lg flex items-center justify-center'>
              <svg className='w-5 h-5 text-[#1e40af]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
              </svg>
            </div>
          </div>

          <div className='absolute top-1/2 -right-8 bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-white/20'>
            <div className='w-8 h-8 bg-white rounded-lg flex items-center justify-center'>
              <svg className='w-5 h-5 text-[#1e40af]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
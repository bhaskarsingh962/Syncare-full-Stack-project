import React from 'react'
import { assets } from '../assets/assets_client/assets'
import { useNavigate } from 'react-router-dom'


const Banner = () => {
  
  const navigate = useNavigate();
     
  return (
    <div className='flex bg-gradient-to-br from-[#5f6fff] to-[#4c63d2] rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 shadow-2xl border border-white/20 backdrop-blur-sm'>
        {/*........left side...... */}
        <div className=' flex-1 py-8 sm:py-16 lg:py-24 lg:pl-5'>
            <div className=' text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight'>
                <p className='bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>Book Appointment</p>
                <p className='mt-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>With 100+ Trusted Doctors</p>
            </div>
            <p className='text-blue-100 text-sm sm:text-base mt-4 mb-6 max-w-md'>
                Experience premium healthcare with our network of verified medical professionals
            </p>
            <button 
                onClick={()=> {navigate('/login'); scrollTo(0,0)}} 
                className='bg-white text-sm sm:text-base text-[#5f6fff] px-8 py-3 rounded-full mt-6 hover:scale-105 hover:shadow-xl transform transition-all duration-300 font-semibold border-2 border-white hover:bg-blue-50'
            >
                Create account
            </button>
        </div>
        
        {/* .....right side - Professional Medical Structure...... */}
        <div className='hidden md:flex md:w-1/2 lg:w-[400px] relative items-center justify-center p-8'>
            <div className='relative w-full max-w-sm'>
                {/* Main Professional Card */}
                <div className='bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl'>
                    <div className='text-center'>
                        {/* Appointment Booking Icon */}
                        <div className='w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
                            <svg className='w-12 h-12 text-[#1e40af]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                        </div>
                        
                        <h3 className='text-white text-2xl font-bold mb-2'>Smart Appointment System</h3>
                        <p className='text-blue-100 text-sm mb-6'>Book with specialists in seconds</p>
                        
                        {/* Stats Grid */}
                        <div className='grid grid-cols-2 gap-4 mb-6'>
                            <div className='bg-white/20 rounded-xl p-4 text-center'>
                                <div className='text-white text-2xl font-bold'>15+</div>
                                <div className='text-blue-200 text-xs'>Specialties</div>
                            </div>
                            <div className='bg-white/20 rounded-xl p-4 text-center'>
                                <div className='text-white text-2xl font-bold'>5min</div>
                                <div className='text-blue-200 text-xs'>Avg Booking</div>
                            </div>
                        </div>
                        
                        {/* Unique Features */}
                        <div className='space-y-2'>
                            <div className='flex items-center justify-center gap-2 text-white/90 text-sm'>
                                <svg className='w-4 h-4 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                </svg>
                                <span>Real-time Availability</span>
                            </div>
                            <div className='flex items-center justify-center gap-2 text-white/90 text-sm'>
                                <svg className='w-4 h-4 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                </svg>
                                <span>Digital Prescriptions</span>
                            </div>
                            <div className='flex items-center justify-center gap-2 text-white/90 text-sm'>
                                <svg className='w-4 h-4 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                </svg>
                                <span>Follow-up Reminders</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Appointment Elements */}
                <div className='absolute -top-4 -left-4 bg-white/25 backdrop-blur-sm rounded-2xl p-3 border border-white/30'>
                    <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center'>
                        <svg className='w-6 h-6 text-[#1e40af]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 5h6V3H4v2zM4 11h6V9H4v2zM4 15h6v-2H4v2z' />
                        </svg>
                    </div>
                </div>

                <div className='absolute -bottom-4 -right-4 bg-white/25 backdrop-blur-sm rounded-2xl p-3 border border-white/30'>
                    <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center'>
                        <svg className='w-6 h-6 text-[#1e40af]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                        </svg>
                    </div>
                </div>

                <div className='absolute top-1/2 -right-6 bg-white/25 backdrop-blur-sm rounded-2xl p-3 border border-white/30'>
                    <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center'>
                        <svg className='w-6 h-6 text-[#1e40af]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                        </svg>
                    </div>
                </div>

                {/* Animated Background Elements */}
                <div className='absolute inset-0 overflow-hidden rounded-3xl pointer-events-none'>
                    <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse'></div>
                    <div className='absolute top-3/4 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000'></div>
                    <div className='absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-500'></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner
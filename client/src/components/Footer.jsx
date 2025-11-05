import React from 'react'
import { assets } from '../assets/assets_client/assets'

function Footer() {
  return (
    <footer className='relative overflow-hidden border-t border-gray-200 bg-gradient-to-br from-white to-blue-50'>
      {/* subtle background accent */}
      <div className='pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-50'></div>

      <div className='mx-6 md:mx-10'>
        <div className='mt-28 md:mt-36 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 text-sm'>
          {/* brand */}
          <div>
            <img className='mb-5 w-40' src={assets.logoWeb} alt='Syncare logo' />
            <p className='text-gray-600 leading-6'>
              Healthcare made simple. We connect you with trusted doctors and
              provide a seamless experience from booking to care, with a focus
              on compassion, reliability, and modern convenience.
            </p>
            <div className='mt-6 flex items-center gap-3'>
              {/* social icons - decorative only */}
              <a aria-label='Twitter' className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#5f6fff] text-white transition-colors duration-200 hover:bg-[#4c63d2] cursor-pointer'>
                <svg className='h-4.5 w-4.5' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M24 4.56c-.89.39-1.85.65-2.85.77 1.02-.61 1.8-1.58 2.17-2.73-.95.57-2.01.98-3.13 1.2-.9-.96-2.19-1.56-3.6-1.56-3.18 0-5.53 2.97-4.81 6.05C7.64 7.99 4.05 6.03 1.62 3.06.32 5.27.94 8.17 3.14 9.64c-.77-.02-1.5-.24-2.15-.6-.05 2.28 1.58 4.42 3.95 4.9-.68.18-1.42.23-2.2.08.62 1.96 2.44 3.38 4.6 3.42-2.08 1.63-4.7 2.36-7.31 2.04C2.2 21.33 4.79 22.15 7.57 22.15 16 22.15 20.33 15.6 20.33 9.93c0-.19 0-.38-.01-.57.85-.6 1.57-1.36 2.14-2.23z'/>
                </svg>
              </a>
              <a aria-label='Instagram' className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#5f6fff] text-white transition-colors duration-200 hover:bg-[#4c63d2] cursor-pointer'>
                <svg className='h-4.5 w-4.5' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .4 1.5.9.5.5.7.9.9 1.5.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.4 1-.9 1.5-.5.5-.9.7-1.5.9-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.4-1.5-.9-.5-.5-.7-.9-.9-1.5-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.4-1 .9-1.5.5-.5.9-.7 1.5-.9.4-.2 1.1-.3 2.3-.4 1.3-.1 1.7-.1 4.9-.1zm0 1.8c-3.1 0-3.5 0-4.8.1-1.1.1-1.7.2-2.1.3-.5.2-.8.3-1.1.6-.3.3-.5.6-.6 1.1-.1.4-.2 1-.3 2.1-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.7.3 2.1.2.5.3.8.6 1.1.3.3.6.5 1.1.6.4.1 1 .3 2.1.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.7-.2 2.1-.3.5-.2.8-.3 1.1-.6.3-.3.6-.5.6-1.1.1-.4.2-1 .3-2.1.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.7-.3-2.1-.2-.5-.3-.8-.6-1.1-.3-.3-.6-.5-1.1-.6-.4-.1-1-.3-2.1-.3-1.3-.1-1.7-.1-4.8-.1zm0 3.1a6.9 6.9 0 1 1 0 13.8 6.9 6.9 0 0 1 0-13.8zm0 1.8a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm5.6-2.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z'/>
                </svg>
              </a>
              <a aria-label='LinkedIn' className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#5f6fff] text-white transition-colors duration-200 hover:bg-[#4c63d2] cursor-pointer'>
                <svg className='h-4.5 w-4.5' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.27 2.31-2.6 4.76-2.6C22.4 7.6 24 10.1 24 14v10h-5v-8.6c0-2-.04-4.6-2.8-4.6-2.8 0-3.23 2.2-3.23 4.5V24H8z'/>
                </svg>
              </a>
            </div>
          </div>

          {/* company */}
          <div>
            <p className='text-xs font-semibold tracking-widest text-gray-700 mb-4'>COMPANY</p>
            <ul className='space-y-3 text-gray-600'>
              <li className='hover:text-[#5f6fff] cursor-pointer transition-colors'>Home</li>
              <li className='hover:text-[#5f6fff] cursor-pointer transition-colors'>About us</li>
              <li className='hover:text-[#5f6fff] cursor-pointer transition-colors'>Our doctors</li>
              <li className='hover:text-[#5f6fff] cursor-pointer transition-colors'>Careers</li>
            </ul>
          </div>

          {/* resources */}
          <div>
            <p className='text-xs font-semibold tracking-widest text-gray-700 mb-4'>RESOURCES</p>
            <ul className='space-y-3 text-gray-600'>
              <li className='hover:text-[#5f6fff] cursor-pointer transition-colors'>Blog</li>
              <li className='hover:text-[#5f6fff] cursor-pointer transition-colors'>Help center</li>
              <li className='hover:text-[#5f6fff] cursor-pointer transition-colors'>Patient guides</li>
              <li className='hover:text-[#5f6fff] cursor-pointer transition-colors'>Privacy policy</li>
            </ul>
          </div>

          {/* newsletter / contact */}
          <div>
            <p className='text-xs font-semibold tracking-widest text-gray-700 mb-4'>STAY UPDATED</p>
            <p className='text-gray-600 leading-6'>
              Get occasional updates about new features and health tips. No spam.
            </p>
            <div className='mt-4 flex items-center gap-2'>
              <input
                className='w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#5f6fff]'
                placeholder='Enter your email'
                type='email'
                aria-label='Email address'
              />
              <button className='shrink-0 rounded-md bg-[#5f6fff] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4c63d2]'>
                Subscribe
              </button>
            </div>

            <ul className='mt-5 space-y-2 text-gray-600'>
              <li className='flex items-center'>
                <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3 5h18M8 5V3m8 2V3M5 9h14l-1 11H6L5 9z' />
                </svg>
                Mon–Sat: 9:00 AM – 10:00 PM
              </li>
              <li className='flex items-center'>
                <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3 8l7.89 4.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z' />
                </svg>
                support@syncare.dev
              </li>
            </ul>
          </div>
        </div>

        {/* footnote */}
        <div className='mt-10 md:mt-14 border-t border-gray-200/70 bg-white/40'>
          <div className='flex flex-col md:flex-row items-center justify-between py-6 text-sm text-gray-600'>
            <p className='text-center md:text-left'>
              © 2024 Syncare. All rights reserved.
            </p>
            <ul className='mt-3 md:mt-0 flex items-center gap-5'>
              <li className='hover:text-[#5f6fff] cursor-pointer transition-colors'>Terms</li>
              <li className='hover:text-[#5f6fff] cursor-pointer transition-colors'>Privacy</li>
              <li className='hover:text-[#5f6fff] cursor-pointer transition-colors'>Cookies</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
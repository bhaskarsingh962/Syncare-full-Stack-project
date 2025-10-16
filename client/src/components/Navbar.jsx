import React, { useContext, useRef, useState } from 'react'
import {assets} from '../assets/assets_client/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const navigate = useNavigate();  
  
  const {token, setToken, userData} = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  }

  return (
    <nav className='bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div 
            onClick={()=>{navigate('/')}} 
            className='flex-shrink-0 cursor-pointer transform hover:scale-105 transition-transform duration-200'
          >
            <img className='h-10 w-auto' src={assets.logoWeb} alt='logo' />
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
              <NavLink 
                to={'/'} 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-[#5f6fff] bg-blue-50 border-b-2 border-[#5f6fff]' 
                      : 'text-gray-700 hover:text-[#5f6fff] hover:bg-blue-50 hover:scale-105'
                  }`
                }
              >
                HOME
              </NavLink>
              <NavLink 
                to={'/doctors'} 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-[#5f6fff] bg-blue-50 border-b-2 border-[#5f6fff]' 
                      : 'text-gray-700 hover:text-[#5f6fff] hover:bg-blue-50 hover:scale-105'
                  }`
                }
              >
                ALL DOCTORS
              </NavLink>
              <NavLink 
                to={'/about'} 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-[#5f6fff] bg-blue-50 border-b-2 border-[#5f6fff]' 
                      : 'text-gray-700 hover:text-[#5f6fff] hover:bg-blue-50 hover:scale-105'
                  }`
                }
              >
                ABOUT
              </NavLink>
              <NavLink 
                to={'/contact'} 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-[#5f6fff] bg-blue-50 border-b-2 border-[#5f6fff]' 
                      : 'text-gray-700 hover:text-[#5f6fff] hover:bg-blue-50 hover:scale-105'
                  }`
                }
              >
                CONTACT
              </NavLink>
            </div>
          </div>

          {/* User Actions */}
          <div className='hidden md:block'>
            <div className='ml-4 flex items-center md:ml-6'>
              {token && userData ? (
                <div className='relative group'>
                  <div className='flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-all duration-200'>
                    <img 
                      className='h-8 w-8 rounded-full border-2 border-[#5f6fff] shadow-md' 
                      src={userData.image} 
                      alt='profile pic' 
                    />
                    <span className='text-sm font-medium text-gray-700'>{userData.name}</span>
                    <svg className='w-4 h-4 text-gray-500 group-hover:text-[#5f6fff] transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className='absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0'>
                    <div className='py-2'>
                      <div 
                        onClick={() => navigate('my-profile')} 
                        className='flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#5f6fff] cursor-pointer transition-colors duration-200'
                      >
                        <svg className='w-4 h-4 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                        </svg>
                        My Profile
                      </div>
                      <div 
                        onClick={() => navigate('my-appointments')} 
                        className='flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#5f6fff] cursor-pointer transition-colors duration-200'
                      >
                        <svg className='w-4 h-4 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                        My Appointments
                      </div>
                      <hr className='my-2 border-gray-100' />
                      <div 
                        onClick={logout} 
                        className='flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-200'
                      >
                        <svg className='w-4 h-4 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                        </svg>
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={()=>navigate('/login')} 
                  className='bg-gradient-to-r from-[#5f6fff] to-[#4c63d2] text-white px-6 py-2 rounded-full text-sm font-medium hover:from-[#4c63d2] hover:to-[#3b4db8] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl'
                >
                  Create Account
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#5f6fff] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#5f6fff] transition-all duration-200'
            >
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                {showMenu ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        showMenu 
          ? 'max-h-96 opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className='px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 shadow-lg'>
          <NavLink 
            onClick={()=>setShowMenu(false)} 
            to={'/'} 
            className={({ isActive }) => 
              `block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                isActive 
                  ? 'text-[#5f6fff] bg-blue-50 border-l-4 border-[#5f6fff]' 
                  : 'text-gray-700 hover:text-[#5f6fff] hover:bg-blue-50'
              }`
            }
          >
            HOME
          </NavLink>
          <NavLink 
            onClick={()=>setShowMenu(false)} 
            to={'/doctors'} 
            className={({ isActive }) => 
              `block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                isActive 
                  ? 'text-[#5f6fff] bg-blue-50 border-l-4 border-[#5f6fff]' 
                  : 'text-gray-700 hover:text-[#5f6fff] hover:bg-blue-50'
              }`
            }
          >
            ALL DOCTORS
          </NavLink>
          <NavLink 
            onClick={()=>setShowMenu(false)} 
            to={'/about'} 
            className={({ isActive }) => 
              `block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                isActive 
                  ? 'text-[#5f6fff] bg-blue-50 border-l-4 border-[#5f6fff]' 
                  : 'text-gray-700 hover:text-[#5f6fff] hover:bg-blue-50'
              }`
            }
          >
            ABOUT
          </NavLink>
          <NavLink 
            onClick={()=>setShowMenu(false)} 
            to={'/contact'} 
            className={({ isActive }) => 
              `block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                isActive 
                  ? 'text-[#5f6fff] bg-blue-50 border-l-4 border-[#5f6fff]' 
                  : 'text-gray-700 hover:text-[#5f6fff] hover:bg-blue-50'
              }`
            }
          >
            CONTACT
          </NavLink>
          
          {/* Mobile User Actions */}
          <div className='pt-4 border-t border-gray-200'>
            {!token && (
              <button 
                onClick={()=>{navigate('/login'); setShowMenu(false)}} 
                className='w-full bg-gradient-to-r from-[#5f6fff] to-[#4c63d2] text-white px-4 py-3 rounded-lg text-base font-medium hover:from-[#4c63d2] hover:to-[#3b4db8] transition-all duration-200 shadow-lg'
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
import React, { useState } from 'react';
import { useSocket } from '../context/socketContext';

const NotificationCenter = () => {
  const { notifications, isConnected, clearNotifications, removeNotification } = useSocket();
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment':
        return '📅';
      case 'success':
        return '✅';
      case 'cancellation':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-100 border-blue-300';
      case 'success':
        return 'bg-green-100 border-green-300';
      case 'cancellation':
        return 'bg-red-100 border-red-300';
      case 'info':
        return 'bg-gray-100 border-gray-300';
      default:
        return 'bg-yellow-100 border-yellow-300';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        
        {/* Notification Badge */}
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
        
        {/* Connection Status */}
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`} title={isConnected ? 'Connected' : 'Disconnected'} />
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Notifications
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={clearNotifications}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 ${getNotificationColor(notification.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;

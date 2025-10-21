import React, { useEffect } from 'react';
import { useSocket } from '../context/socketContext';

const SocketExample = () => {
  const { socket, notifications, isConnected, joinRoom, sendNotification } = useSocket();

  useEffect(() => {
    // Example: Join a room when component mounts
    if (socket && isConnected) {
      joinRoom('user-room');
    }
  }, [socket, isConnected, joinRoom]);

  const handleSendTestNotification = () => {
    // Example: Send a test notification
    sendNotification('some-user-id', 'This is a test notification!', 'info');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Socket.IO Example</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">
            Connection Status: 
            <span className={`ml-2 px-2 py-1 rounded text-xs ${
              isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">
            Notifications: {notifications.length}
          </p>
        </div>

        <button
          onClick={handleSendTestNotification}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!isConnected}
        >
          Send Test Notification
        </button>

        {notifications.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Recent Notifications:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {notifications.slice(-3).map((notification) => (
                <div key={notification.id} className="p-2 bg-gray-50 rounded text-sm">
                  <p>{notification.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocketExample;

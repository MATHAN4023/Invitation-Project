import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an auth context for managing user state

const AppBar = () => {
  const { user } = useAuth(); // Get user from context
  const avatarUrl = user ? `https://api.adorable.io/avatars/285/${user.username}.png` : ''; // Generate avatar URL based on username

  return (
    <div className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">MyApp</div>
      <div className="flex items-center">
        {user ? (
          <img src={avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full mr-2" />
        ) : (
          <Link to="/login" className="text-white">Login</Link>
        )}
      </div>
    </div>
  );
};

export default AppBar;

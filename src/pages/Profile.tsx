import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { User, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="page-transition max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-800 text-white p-6 flex items-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mr-4">
            <User size={32} className="text-blue-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-blue-100">{user.email}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-500 mb-1">Account Type</p>
                <p className="font-medium">{user.isAdmin ? 'Admin' : 'Customer'}</p>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-500 mb-1">Member Since</p>
                <p className="font-medium">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <LogOut size={18} className="mr-2" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
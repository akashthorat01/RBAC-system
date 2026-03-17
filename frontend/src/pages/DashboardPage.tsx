
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Shield, User as UserIcon, Globe } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { contentApi } from '../api/auth';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const { data: publicData, isLoading: publicLoading } = useQuery({
    queryKey: ['publicContent'],
    queryFn: contentApi.getPublic
  });

  const { data: userData, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['userContent'],
    queryFn: contentApi.getUser,
    retry: false
  });

  const { data: adminData, isLoading: adminLoading, error: adminError } = useQuery({
    queryKey: ['adminContent'],
    queryFn: contentApi.getAdmin,
    retry: false,
    enabled: user?.role === 'ADMIN'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold tracking-tight text-blue-600 flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                RBAC System
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                {user?.name} 
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs text-white ${user?.role === 'ADMIN' ? 'bg-red-500' : 'bg-blue-500'}`}>
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center border border-transparent px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 focus:outline-none transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Public Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center">
            <Globe className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Public Section</h3>
          </div>
          <div className="p-6">
            {publicLoading ? <p className="text-gray-500 animate-pulse">Loading...</p> : 
              <p className="text-gray-700">{publicData?.message}</p>}
          </div>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-200 overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center">
            <UserIcon className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium text-blue-900">User Section</h3>
          </div>
          <div className="p-6">
            {userLoading ? <p className="text-gray-500 animate-pulse">Loading...</p> : 
             userError ? <p className="text-red-500 font-medium">Access Denied</p> :
              <p className="text-gray-700">{userData?.message}</p>}
          </div>
        </div>

        {/* Admin Card */}
        <div className="bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
          <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center">
            <Shield className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-lg font-medium text-red-900">Admin Section</h3>
          </div>
          <div className="p-6">
            {user?.role !== 'ADMIN' ? (
              <p className="text-gray-500 italic">You do not have permission to view this section.</p>
            ) : adminLoading ? (
              <p className="text-gray-500 animate-pulse">Loading...</p>
            ) : adminError ? (
              <p className="text-red-500 font-medium">Access Denied</p>
            ) : (
              <p className="text-gray-700 font-medium">{adminData?.message}</p>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

import React from 'react';
import { Shield, Bell, Activity } from 'lucide-react';

interface HeaderProps {
  activeAlerts: number;
}

export const Header: React.FC<HeaderProps> = ({ activeAlerts }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Community Health Outbreak Prevention
              </h1>
              <p className="text-sm text-gray-500">Early Warning System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">System Active</span>
            </div>
            
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {activeAlerts > 0 && (
                <span className="absolute -top-2 -right-2 bg-danger-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {activeAlerts}
                </span>
              )}
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Health Department</p>
              <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
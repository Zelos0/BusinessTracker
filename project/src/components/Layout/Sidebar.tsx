import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, FileText, DollarSign, Users, Settings, Home } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard', color: 'text-blue-600' },
    { path: '/protocols', icon: FileText, label: 'Protocols', color: 'text-indigo-600' },
    { path: '/budget', icon: DollarSign, label: 'Budget', color: 'text-green-600' },
    { path: '/scheduling', icon: Users, label: 'Scheduling', color: 'text-purple-600' },
    { path: '/settings', icon: Settings, label: 'Settings', color: 'text-gray-600' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-3 mb-8">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">BusinessPro</span>
        </Link>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? `${item.color} bg-gray-100`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
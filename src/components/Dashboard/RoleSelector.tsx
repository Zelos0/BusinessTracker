import React from 'react';
import { User, Shield, Crown, Briefcase, Calculator, Users as UsersIcon } from 'lucide-react';

interface RoleSelectorProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ currentRole, onRoleChange }) => {
  const roles = [
    { id: 'admin', name: 'Administrator', icon: Crown, color: 'text-red-600', bgColor: 'bg-red-50' },
    { id: 'manager', name: 'Manager', icon: Shield, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'finance', name: 'Finanzen', icon: Calculator, color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 'hr', name: 'Personal', icon: UsersIcon, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'user', name: 'Benutzer', icon: User, color: 'text-gray-600', bgColor: 'bg-gray-50' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Rolle wechseln (Demo)</h3>
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = currentRole === role.id;
          
          return (
            <button
              key={role.id}
              onClick={() => onRoleChange(role.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? `${role.color} ${role.bgColor} border-2 border-current`
                  : 'text-gray-600 bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{role.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;
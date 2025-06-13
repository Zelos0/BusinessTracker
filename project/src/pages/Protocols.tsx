import React from 'react';
import { FileText, Plus, Search, Filter } from 'lucide-react';

const Protocols: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Protocol Management</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Protocol</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search protocols..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Protocol Management</h3>
          <p className="text-gray-600 mb-4">This module will be implemented in Step 2</p>
          <div className="text-sm text-gray-500">
            Features include:
            <ul className="mt-2 space-y-1">
              <li>• Event tracking with categories and status</li>
              <li>• Advanced search and filtering</li>
              <li>• Priority management and assignments</li>
              <li>• Due date tracking and alerts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protocols;
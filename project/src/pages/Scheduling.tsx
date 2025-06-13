import React from 'react';
import { Users, Plus, Calendar, Clock } from 'lucide-react';

const Scheduling: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Staff Scheduling</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Schedule Shift</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Staff Scheduling</h3>
          <p className="text-gray-600 mb-4">This module will be implemented in Step 4</p>
          <div className="text-sm text-gray-500">
            Features include:
            <ul className="mt-2 space-y-1">
              <li>• Shift planning with conflict detection</li>
              <li>• Staff availability management</li>
              <li>• Coverage monitoring and alerts</li>
              <li>• Schedule optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
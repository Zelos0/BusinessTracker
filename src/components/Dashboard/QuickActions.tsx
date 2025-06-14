import React from 'react';
import { 
  FileText, 
  DollarSign, 
  Users, 
  Plus, 
  Calendar,
  BarChart3,
  Settings,
  Download,
  Upload,
  Bell,
  Search
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  hoverColor: string;
  onClick: () => void;
  category: 'primary' | 'secondary' | 'utility';
  roles?: string[];
  context?: string[];
}

interface QuickActionsProps {
  userRole?: string;
  currentContext?: string;
  onAction?: (actionId: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  userRole = 'user', 
  currentContext = 'dashboard',
  onAction 
}) => {
  const handleAction = (actionId: string, customAction?: () => void) => {
    if (customAction) {
      customAction();
    }
    if (onAction) {
      onAction(actionId);
    }
  };

  const allActions: QuickAction[] = [
    // Primary Actions
    {
      id: 'new-protocol',
      title: 'Neues Protokoll',
      description: 'Erstelle ein neues Protokoll oder Meeting-Protokoll',
      icon: FileText,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      hoverColor: 'hover:bg-indigo-100',
      category: 'primary',
      roles: ['admin', 'manager', 'user'],
      context: ['dashboard', 'protocols'],
      onClick: () => handleAction('new-protocol', () => {
        // Navigation zur Protokoll-Erstellung
        window.location.href = '/protocols?action=new';
      })
    },
    {
      id: 'add-budget-item',
      title: 'Budget-Eintrag',
      description: 'Füge eine neue Einnahme oder Ausgabe hinzu',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      category: 'primary',
      roles: ['admin', 'manager', 'finance'],
      context: ['dashboard', 'budget'],
      onClick: () => handleAction('add-budget-item', () => {
        // Navigation zur Budget-Erstellung
        window.location.href = '/budget?action=new';
      })
    },
    {
      id: 'schedule-shift',
      title: 'Schicht planen',
      description: 'Plane eine neue Arbeitsschicht oder Termin',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      category: 'primary',
      roles: ['admin', 'manager', 'hr'],
      context: ['dashboard', 'scheduling'],
      onClick: () => handleAction('schedule-shift', () => {
        // Navigation zur Schichtplanung
        window.location.href = '/scheduling?action=new';
      })
    },
    
    // Secondary Actions
    {
      id: 'quick-report',
      title: 'Schnellbericht',
      description: 'Generiere einen aktuellen Statusbericht',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      category: 'secondary',
      roles: ['admin', 'manager'],
      context: ['dashboard'],
      onClick: () => handleAction('quick-report', () => {
        // Bericht generieren
        console.log('Generating quick report...');
      })
    },
    {
      id: 'calendar-view',
      title: 'Kalender öffnen',
      description: 'Zeige den Kalender mit anstehenden Terminen',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      category: 'secondary',
      roles: ['admin', 'manager', 'user'],
      context: ['dashboard', 'scheduling'],
      onClick: () => handleAction('calendar-view', () => {
        // Kalender öffnen
        console.log('Opening calendar view...');
      })
    },
    
    // Utility Actions
    {
      id: 'export-data',
      title: 'Daten exportieren',
      description: 'Exportiere aktuelle Daten als CSV oder PDF',
      icon: Download,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      hoverColor: 'hover:bg-gray-100',
      category: 'utility',
      roles: ['admin', 'manager'],
      context: ['dashboard', 'budget', 'protocols'],
      onClick: () => handleAction('export-data', () => {
        // Export-Dialog öffnen
        console.log('Opening export dialog...');
      })
    },
    {
      id: 'import-data',
      title: 'Daten importieren',
      description: 'Importiere Daten aus externen Quellen',
      icon: Upload,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      hoverColor: 'hover:bg-gray-100',
      category: 'utility',
      roles: ['admin'],
      context: ['dashboard', 'settings'],
      onClick: () => handleAction('import-data', () => {
        // Import-Dialog öffnen
        console.log('Opening import dialog...');
      })
    },
    {
      id: 'notifications',
      title: 'Benachrichtigungen',
      description: 'Zeige alle ungelesenen Benachrichtigungen',
      icon: Bell,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      hoverColor: 'hover:bg-yellow-100',
      category: 'utility',
      roles: ['admin', 'manager', 'user'],
      context: ['dashboard'],
      onClick: () => handleAction('notifications', () => {
        // Benachrichtigungen anzeigen
        console.log('Showing notifications...');
      })
    },
    {
      id: 'global-search',
      title: 'Globale Suche',
      description: 'Durchsuche alle Module und Daten',
      icon: Search,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      hoverColor: 'hover:bg-indigo-100',
      category: 'utility',
      roles: ['admin', 'manager', 'user'],
      context: ['dashboard'],
      onClick: () => handleAction('global-search', () => {
        // Suchfunktion aktivieren
        console.log('Activating global search...');
      })
    }
  ];

  // Filter actions based on user role and context
  const filteredActions = allActions.filter(action => {
    const hasRole = !action.roles || action.roles.includes(userRole);
    const hasContext = !action.context || action.context.includes(currentContext);
    return hasRole && hasContext;
  });

  // Group actions by category
  const primaryActions = filteredActions.filter(action => action.category === 'primary');
  const secondaryActions = filteredActions.filter(action => action.category === 'secondary');
  const utilityActions = filteredActions.filter(action => action.category === 'utility');

  const renderActionGroup = (actions: QuickAction[], title: string, gridCols: string = 'grid-cols-1') => {
    if (actions.length === 0) return null;

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider">{title}</h4>
        <div className={`grid ${gridCols} gap-3`}>
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                className={`group p-4 rounded-lg border border-gray-200 ${action.hoverColor} ${action.bgColor} transition-all duration-200 hover:shadow-md hover:border-gray-300 text-left`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">
                      {action.title}
                    </h5>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <div className="text-xs text-gray-500">
          Rolle: <span className="font-medium capitalize">{userRole}</span>
        </div>
      </div>

      <div className="space-y-6">
        {renderActionGroup(primaryActions, 'Hauptaktionen', 'grid-cols-1')}
        {renderActionGroup(secondaryActions, 'Weitere Aktionen', 'grid-cols-1 sm:grid-cols-2')}
        {renderActionGroup(utilityActions, 'Werkzeuge', 'grid-cols-2 sm:grid-cols-3')}
      </div>

      {filteredActions.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <Settings className="h-8 w-8 mx-auto" />
          </div>
          <p className="text-sm text-gray-600">
            Keine Quick Actions für Ihre aktuelle Rolle verfügbar.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
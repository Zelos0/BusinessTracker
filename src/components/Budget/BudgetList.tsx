import React from 'react';
import { Edit2, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { BudgetEntry } from '../../types';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface BudgetListProps {
  entries: BudgetEntry[];
  onEdit: (entry: BudgetEntry) => void;
  onDelete: (id: string) => void;
  sortBy: 'date' | 'amount' | 'category';
  sortOrder: 'asc' | 'desc';
  onSort: (field: 'date' | 'amount' | 'category') => void;
}

const BudgetList: React.FC<BudgetListProps> = ({
  entries,
  onEdit,
  onDelete,
  sortBy,
  sortOrder,
  onSort
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const incomeEntries = entries.filter(entry => entry.type === 'income');
  const expenseEntries = entries.filter(entry => entry.type === 'expense');

  const renderTable = (tableEntries: BudgetEntry[], title: string, colorClass: string) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className={`px-6 py-4 border-b border-gray-200 ${colorClass}`}>
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          {title === 'Einnahmen' ? (
            <ArrowUpCircle className="h-5 w-5" />
          ) : (
            <ArrowDownCircle className="h-5 w-5" />
          )}
          <span>{title}</span>
          <span className="text-sm font-normal">
            ({tableEntries.length} {tableEntries.length === 1 ? 'Eintrag' : 'Einträge'})
          </span>
        </h3>
      </div>
      
      {tableEntries.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <p>Keine {title.toLowerCase()} vorhanden</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => onSort('date')}
                >
                  Datum {getSortIcon('date')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => onSort('category')}
                >
                  Kategorie {getSortIcon('category')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => onSort('amount')}
                >
                  Betrag {getSortIcon('amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Beschreibung
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(entry.date, 'dd.MM.yyyy', { locale: de })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {entry.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${
                      entry.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.type === 'income' ? '+' : '-'}{formatCurrency(entry.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {entry.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(entry)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors"
                        title="Bearbeiten"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(entry.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Löschen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {renderTable(incomeEntries, 'Einnahmen', 'bg-green-600')}
      {renderTable(expenseEntries, 'Ausgaben', 'bg-red-600')}
    </div>
  );
};

export default BudgetList;
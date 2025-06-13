import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, Upload } from 'lucide-react';
import { BudgetEntry } from '../types';
import BudgetForm from '../components/Budget/BudgetForm';
import BudgetList from '../components/Budget/BudgetList';
import BudgetSummary from '../components/Budget/BudgetSummary';

const Budget: React.FC = () => {
  const [entries, setEntries] = useState<BudgetEntry[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<'income' | 'expense'>('income');
  const [editEntry, setEditEntry] = useState<BudgetEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('budgetEntries');
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
      setEntries(parsedEntries);
    } else {
      // Add some sample data
      const sampleEntries: BudgetEntry[] = [
        {
          id: '1',
          type: 'income',
          category: 'Gehalt',
          amount: 3500.00,
          description: 'Monatliches Gehalt',
          date: new Date('2024-01-01')
        },
        {
          id: '2',
          type: 'expense',
          category: 'Miete',
          amount: 1200.00,
          description: 'Monatsmiete',
          date: new Date('2024-01-01')
        },
        {
          id: '3',
          type: 'expense',
          category: 'Tidal Subscription',
          amount: 16.99,
          description: 'Musik-Streaming',
          date: new Date('2024-01-15')
        }
      ];
      setEntries(sampleEntries);
    }
  }, []);

  // Save data to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('budgetEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (type: 'income' | 'expense') => {
    setFormType(type);
    setEditEntry(null);
    setIsFormOpen(true);
  };

  const handleEditEntry = (entry: BudgetEntry) => {
    setFormType(entry.type);
    setEditEntry(entry);
    setIsFormOpen(true);
  };

  const handleSaveEntry = (entryData: Omit<BudgetEntry, 'id'>) => {
    if (editEntry) {
      // Update existing entry
      setEntries(prev => prev.map(entry => 
        entry.id === editEntry.id 
          ? { ...entryData, id: editEntry.id }
          : entry
      ));
    } else {
      // Add new entry
      const newEntry: BudgetEntry = {
        ...entryData,
        id: Date.now().toString()
      };
      setEntries(prev => [...prev, newEntry]);
    }
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?')) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const handleSort = (field: 'date' | 'amount' | 'category') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `budget-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          const importedEntries = importedData.map((entry: any) => ({
            ...entry,
            date: new Date(entry.date),
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
          }));
          setEntries(prev => [...prev, ...importedEntries]);
          alert(`${importedEntries.length} Einträge erfolgreich importiert!`);
        } catch (error) {
          alert('Fehler beim Importieren der Datei. Bitte überprüfen Sie das Format.');
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    event.target.value = '';
  };

  // Filter and sort entries
  const filteredEntries = entries
    .filter(entry => 
      entry.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.description && entry.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = a.date.getTime() - b.date.getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleAddEntry('income')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Einnahmen hinzufügen</span>
          </button>
          <button
            onClick={() => handleAddEntry('expense')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Ausgaben hinzufügen</span>
          </button>
        </div>
      </div>

      <BudgetSummary entries={entries} />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex-1 relative max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Suche nach Kategorie oder Beschreibung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            
            <label className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2 cursor-pointer transition-colors">
              <Upload className="h-4 w-4" />
              <span>Import</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <BudgetList
          entries={filteredEntries}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </div>

      <BudgetForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveEntry}
        type={formType}
        editEntry={editEntry}
      />
    </div>
  );
};

export default Budget;
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { BudgetEntry } from '../../types';

interface BudgetSummaryProps {
  entries: BudgetEntry[];
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ entries }) => {
  const totalIncome = entries
    .filter(entry => entry.type === 'income')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalExpenses = entries
    .filter(entry => entry.type === 'expense')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const balance = totalIncome - totalExpenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getBalanceColor = () => {
    if (balance > 0) return 'text-green-600';
    if (balance < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getBalanceIcon = () => {
    if (balance > 0) return <TrendingUp className="h-6 w-6" />;
    if (balance < 0) return <TrendingDown className="h-6 w-6" />;
    return <DollarSign className="h-6 w-6" />;
  };

  const stats = [
    {
      title: 'Gesamte Einnahmen',
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      count: entries.filter(e => e.type === 'income').length
    },
    {
      title: 'Gesamte Ausgaben',
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      count: entries.filter(e => e.type === 'expense').length
    },
    {
      title: 'Saldo',
      value: formatCurrency(balance),
      icon: getBalanceIcon(),
      color: getBalanceColor(),
      bgColor: balance >= 0 ? 'bg-green-50' : 'bg-red-50',
      count: null
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = typeof stat.icon === 'function' ? stat.icon : () => stat.icon;
        
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold mt-2 ${stat.color}`}>
                  {stat.value}
                </p>
                {stat.count !== null && (
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.count} {stat.count === 1 ? 'Eintrag' : 'Einträge'}
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <div className={stat.color}>
                  <IconComponent />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetSummary;
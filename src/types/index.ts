export interface Protocol {
  id: string;
  date: Date;
  category: 'meeting' | 'issue' | 'decision' | 'task' | 'milestone';
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  dueDate?: Date;
  tags: string[];
}

export interface BudgetItem {
  id: string;
  category: string;
  subcategory: string;
  description: string;
  plannedAmount: number;
  actualAmount: number;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
  department: string;
  notes?: string;
}

export interface BudgetEntry {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description?: string;
  date: Date;
}

export interface Staff {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone?: string;
  skills: string[];
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}

export interface Shift {
  id: string;
  staffId: string;
  date: Date;
  startTime: string;
  endTime: string;
  position: string;
  department: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}
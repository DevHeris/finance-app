import { Injectable } from '@angular/core';
import { Budget } from '../../shared/models/budget-model';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  budgets: Budget[];
  constructor() {
    this.budgets = initialBudgets;
  }
}

const initialBudgets = [
  {
    category: 'Entertainment',
    maximum: 50.0,
    theme: '#277C78',
  },
  {
    category: 'Bills',
    maximum: 750.0,
    theme: '#82C9D7',
  },
  {
    category: 'Dining Out',
    maximum: 75.0,
    theme: '#F2CDAC',
  },
  {
    category: 'Personal Care',
    maximum: 100.0,
    theme: '#626070',
  },
];

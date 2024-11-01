import { inject, Injectable } from '@angular/core';
import { TransactionsService } from '../../pages/transactions/transactions.service';
import { Transaction } from '../models/transaction-model';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private selectedSort$ = new BehaviorSubject<string>('Latest');
  private selectedCategory$ = new BehaviorSubject<string>('All Transactions');

  filteredTransactions: Transaction[] = [];

  transactionsService = inject(TransactionsService);

  setSort(option: string) {
    this.selectedSort$.next(option);
  }

  setCategory(category: string) {
    this.selectedCategory$.next(category);
  }

  getSelectedSort(): Observable<string> {
    return this.selectedSort$.asObservable();
  }

  getSelectedCategory(): Observable<string> {
    return this.selectedCategory$.asObservable();
  }

  filterTransactions(method: 'sort' | 'category'): void {
    const category = this.selectedCategory$.getValue();
    const sortOption = this.selectedSort$.getValue();
    this.transactionsService.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        this.filteredTransactions = transactions.filter((transaction) => {
          return (
            category === 'All Transactions' ||
            transaction.category.toLowerCase() === category.toLowerCase()
          );
        });
        this.transactionsService.updateDisplayedTransactions(this.filteredTransactions);
        this.transactionsService.updatePageInfo({
          pageSize: this.filteredTransactions.length <= 10 ? this.filteredTransactions.length : 10,
          pageLength: this.filteredTransactions.length,
        });
      },
    });
  }
}

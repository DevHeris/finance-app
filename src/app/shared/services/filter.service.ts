import { inject, Injectable } from '@angular/core';
import { TransactionsService } from '../../pages/transactions/transactions.service';
import { Transaction } from '../models/transaction-model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private selectedSort$ = new BehaviorSubject<string>('Latest');
  private selectedCategory$ = new BehaviorSubject<string>('All Transactions');

  transactionsService = inject(TransactionsService);

  setSort(option: string) {
    this.selectedSort$.next(option);
  }

  setCategory(category: string) {
    this.selectedCategory$.next(category);
  }

  filterTransactions(method: 'sort' | 'category'): Observable<Transaction[]> | void {
    const transactions = this.transactionsService.getTransactions();
    const category = this.selectedCategory$.getValue();

    return transactions.pipe(
      map((transactions) =>
        transactions.filter((transaction) => {
          category === 'All Transactions' ||
            transaction.category.toLowerCase() === category.toLowerCase();
        }),
      ),
    );
  }
}

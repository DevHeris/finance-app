import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction-model';
import { TransactionsService } from '../../pages/transactions/transactions.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchResults: Transaction[] = [];

  private transactionsService = inject(TransactionsService);
  search(query: string): Observable<Transaction[]> {
    this.searchResults = this.transactionsService
      .getTransactions()
      .filter((transaction) => transaction.name.toLowerCase().includes(query.toLowerCase()));

    return of(this.searchResults);
  }
}

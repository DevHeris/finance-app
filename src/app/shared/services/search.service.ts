import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction-model';
import { TransactionsService } from '../../pages/transactions/transactions.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private transactionsService = inject(TransactionsService);

  searchTransactions(query: string): Observable<Transaction[]> {
    return this.transactionsService
      .getTransactions()
      .pipe(
        map((transactions) =>
          transactions.filter((transaction) =>
            transaction.name.toLowerCase().includes(query.toLowerCase()),
          ),
        ),
      );
  }
}

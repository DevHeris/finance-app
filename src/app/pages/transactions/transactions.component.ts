import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../../shared/models/transaction-model';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  title = 'Finance | Transactions';
  titleService = inject(Title);
  loading: boolean = false;
  results: Transaction[] = [];

  empty: boolean = false;

  private transactionsService = inject(TransactionsService);

  displayedTransactions: Transaction[] = [];
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.transactionsService.pageUpdate.subscribe({
      next: (transactions: Transaction[]) => {
        this.displayedTransactions = transactions;
        if (this.displayedTransactions.length === 0) this.empty = true;
      },
    });
    this.transactionsService.SearchResults.subscribe({
      next: (transactions: Transaction[]) => {
        this.displayedTransactions = transactions;
      },
    });
    this.transactionsService.loadingSearchResults.subscribe({
      next: (status: boolean) => {
        this.loading = status;
      },
    });
  }

  updateResults(newResults: Transaction[]) {}
}

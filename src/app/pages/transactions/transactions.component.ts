import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../../shared/models/transaction-model';
import { FilterService } from '../../shared/services/filter.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  title = 'Finance | Transactions';
  titleService = inject(Title);
  loadingTransactions: boolean = false;
  displayedTransactions: Transaction[] = [];

  private transactionsService = inject(TransactionsService);

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.transactionsService.getLoadingState().subscribe({
      next: (state: boolean) => {
        this.loadingTransactions = state;
      },
    });

    this.transactionsService.getDisplayedTransactions().subscribe({
      next: (displayedTransactions: Transaction[]) => {
        this.displayedTransactions = displayedTransactions;
      },
    });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../shared/models/transaction-model';
import { TransactionsService } from '../transactions/transactions.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  private transactionsService = inject(TransactionsService);
  displayedTransactions: Transaction[] = [];

  ngOnInit(): void {
    this.displayedTransactions = this.transactionsService.getOverviewPageDisplayedTransactions();
  }
}

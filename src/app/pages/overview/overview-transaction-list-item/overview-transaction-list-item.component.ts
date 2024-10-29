import { Component, input, OnInit } from '@angular/core';
import { Transaction } from '../../../shared/models/transaction-model';

@Component({
  selector: 'app-overview-transaction-list-item',
  templateUrl: './overview-transaction-list-item.component.html',
  styleUrl: './overview-transaction-list-item.component.css',
})
export class OverviewTransactionListItemComponent implements OnInit {
  // RECIPIENT == WHO ARE YOU SENDING THE MONEY TO?
  // SENDER == WHO SENT YOU THE MONEY?
  transaction = input<Transaction>();
  transactionType: 'income' | 'expense' = 'income';

  ngOnInit(): void {
    this.transactionType =
      this.transaction()?.amount.toString().charAt(0) === '-' ? 'expense' : 'income';
    console.log(this.transactionType);
  }
}

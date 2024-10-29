import { Component, input } from '@angular/core';
import { Transaction } from '../../models/transaction-model';

@Component({
  selector: 'app-transaction-list-item',
  templateUrl: './transaction-list-item.component.html',
  styleUrl: './transaction-list-item.component.css',
})
export class TransactionListItemComponent {
  transaction = input<Transaction>();
  transactionType: 'income' | 'expense' = 'income';

  ngOnInit(): void {
    this.transactionType =
      this.transaction()?.amount.toString().charAt(0) === '-' ? 'expense' : 'income';
  }
}

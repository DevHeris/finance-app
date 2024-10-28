import { Component, input, OnInit } from '@angular/core';
import { Transaction } from '../../../shared/models/transaction-model';

@Component({
  selector: 'app-overview-transaction-list-item',
  templateUrl: './overview-transaction-list-item.component.html',
  styleUrl: './overview-transaction-list-item.component.css',
})
export class OverviewTransactionListItemComponent {
  // RECIPIENT == WHO ARE YOU SENDING THE MONEY TO?
  // SENDER == WHO SENT YOU THE MONEY?

  transaction = input<Transaction>();

  formatDate(value: any) {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + ' ' + month + ', ' + year;
  }
}

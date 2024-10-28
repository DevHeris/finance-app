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
}

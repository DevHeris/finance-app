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

  private transactionsService = inject(TransactionsService);

  transactions: Transaction[] = [];
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.transactions = this.transactionsService.getTransactions();
  }
}

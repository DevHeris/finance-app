import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { TransactionsService } from '../../../pages/transactions/transactions.service';
import { Transaction } from '../../models/transaction-model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent implements OnInit {
  private transactionsService = inject(TransactionsService);
  totalTransactions: number = 0;
  transactions: Transaction[] = [];
  pageIndex: number = 0;
  pageSize: number = 0;

  ngOnInit(): void {
    this.pageSize = 10;
    this.transactionsService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.totalTransactions = transactions.length;
      },
    });
    this.transactionsService.getPageInfo().subscribe({
      next: (info) => {
        this.pageSize = info.pageSize;
        this.totalTransactions = info.pageLength;
      },
    });
  }

  updateDisplayedTransactions(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const displayedTransactions = this.transactions.slice(startIndex, endIndex);
    this.transactionsService.updateDisplayedTransactions(displayedTransactions);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.updateDisplayedTransactions();
  }
}

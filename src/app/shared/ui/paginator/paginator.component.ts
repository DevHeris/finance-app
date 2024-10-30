import { Component, inject, OnInit, output, ViewEncapsulation } from '@angular/core';
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
  transactions: Transaction[] = [];
  totalTransactions: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageIndex: number = 0;

  currentPageTransactions: Transaction[] = [];

  ngOnInit(): void {
    this.totalTransactions = this.transactionsService.getTransactions().length;
    this.transactions = this.transactionsService.getTransactions();
    this.pageSizeOptions = this.pageSizeOptions.filter((size) => size <= this.totalTransactions);
    this.updateItems();
  }

  updateItems() {
    const startIndex = this.pageIndex * this.pageSize;
    this.currentPageTransactions = this.transactions.slice(startIndex, startIndex + this.pageSize);
    this.transactionsService.pageUpdate.emit(this.currentPageTransactions);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateItems();
  }
}

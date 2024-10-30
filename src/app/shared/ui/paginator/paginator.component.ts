import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
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

  @Input({ transform: numberAttribute }) pageIndex!: number;
  @Input({ transform: numberAttribute }) pageSize!: number;

  currentPageTransactions: Transaction[] = [];

  ngOnInit(): void {
    this.pageSize = 10;
    this.pageIndex = 0;

    this.transactionsService.SearchResults.subscribe({
      next: (results: Transaction[]) => {
        this.updatePageDetails(results);
        this.updateItems();
      },
    });
    this.updatePageDetails(this.transactionsService.getTransactions('all'));
    this.updateItems();
  }

  updatePageDetails(transactions: Array<Transaction>) {
    this.transactions = transactions;
    this.totalTransactions = this.transactions.length;
    this.pageIndex = 0;
  }

  updateItems() {
    const startIndex = this.pageIndex * this.pageSize;
    this.currentPageTransactions = this.transactions.slice(startIndex, startIndex + this.pageSize);
    this.transactionsService.pageUpdate.emit(this.currentPageTransactions);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.updateItems();
  }
}

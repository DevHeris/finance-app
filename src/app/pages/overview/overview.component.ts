import { Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../shared/models/transaction-model';
import { TransactionsService } from '../transactions/transactions.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  title = 'Finance | Overview';

  private transactionsService = inject(TransactionsService);
  private titleService = inject(Title);
  displayedTransactions: Transaction[] = [];

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.displayedTransactions = this.transactionsService.getFirstFiveTransactions();
  }
}

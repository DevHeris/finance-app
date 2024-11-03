import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Transaction } from '../../shared/models/transaction-model';
import { TransactionsService } from '../transactions/transactions.service';
import { Title } from '@angular/platform-browser';
import { Pot } from '../../shared/models/pot-model';
import { PotsService } from '../pots/pots.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  title = 'Finance | Overview';

  private transactionsService = inject(TransactionsService);
  private potsService = inject(PotsService);
  private titleService = inject(Title);
  displayedTransactions: Transaction[] = [];
  displayedPots: Pot[] = [];

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.displayedTransactions = this.transactionsService.getFirstFiveTransactions();
    this.displayedPots = this.potsService.getFirstFourPots();
  }
}

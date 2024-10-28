import { inject, Injectable } from '@angular/core';
import { BudgetsService } from '../pages/budgets/budgets.service';
import { TransactionsService } from '../pages/transactions/transactions.service';
import { PotsService } from '../pages/pots/pots.service';
import { RecurringBillsService } from '../pages/recurring-bills/recurring-bills.service';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private recurringBillsService = inject(RecurringBillsService);
  private transactionsService = inject(TransactionsService);
  private budgetsService = inject(BudgetsService);
  private potsService = inject(PotsService);
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';
import { RecurringBillsComponent } from './pages/recurring-bills/recurring-bills.component';
import { PotsComponent } from './pages/pots/pots.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { authGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'budgets', component: BudgetsComponent },
      { path: 'pots', component: PotsComponent },
      { path: 'recurring-bills', component: RecurringBillsComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

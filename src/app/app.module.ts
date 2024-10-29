import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';
import { PotsComponent } from './pages/pots/pots.component';
import { RecurringBillsComponent } from './pages/recurring-bills/recurring-bills.component';
import { LayoutComponent } from './shared/ui/layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { NavListComponent } from './shared/ui/nav-list/nav-list.component';
import { OverviewTransactionListItemComponent } from './pages/overview/overview-transaction-list-item/overview-transaction-list-item.component';
import { TransactionsToolbarComponent } from './shared/ui/transactions-toolbar/transactions-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TransactionsComponent,
    BudgetsComponent,
    PotsComponent,
    RecurringBillsComponent,
    LayoutComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
    NavListComponent,
    OverviewTransactionListItemComponent,
    TransactionsToolbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule],
  providers: [provideAnimationsAsync(), Title],
  bootstrap: [AppComponent],
})
export class AppModule {}

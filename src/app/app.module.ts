import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';
import { PotsComponent } from './pages/pots/pots.component';
import { RecurringBillsComponent } from './pages/recurring-bills/recurring-bills.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TransactionsComponent,
    BudgetsComponent,
    PotsComponent,
    RecurringBillsComponent,
    SidebarComponent,
    LayoutComponent,
    PageNotFoundComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

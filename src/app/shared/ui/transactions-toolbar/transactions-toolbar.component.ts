import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Transaction } from '../../models/transaction-model';
import { SearchService } from '../../services/search.service';
import { debounceTime, fromEvent, map, switchMap, tap } from 'rxjs';
import { TransactionsService } from '../../../pages/transactions/transactions.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-transactions-toolbar',
  templateUrl: './transactions-toolbar.component.html',
  styleUrl: './transactions-toolbar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TransactionsToolbarComponent implements AfterViewInit {
  private transactionsService = inject(TransactionsService);
  private searchService = inject(SearchService);

  @ViewChild('searchbox') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('sortIcon', { static: false }) sortIcon!: ElementRef;
  @ViewChild('categoryIcon', { static: false }) categoryIcon!: ElementRef;

  isSortOpen: boolean = false;
  isCategoryOpen: boolean = false;
  dropdownStyle = { top: '0px', right: '0px' };
  sortOptionSelected: string = '';
  categorySelected: string = '';
  sortByOptions: Array<string> = ['Latest', 'Oldest', 'A to Z', 'Z to A', 'Highest', 'Lowest'];
  categoryOptions: Array<string> = [
    'All Transactions',
    'Dining Out',
    'General',
    'Groceries',
    'Entertainment',
    'Transportation',
    'Lifestyle',
    'Personal Care',
    'Education',
    'Bills',
    'Shopping',
  ];

  ngAfterViewInit(): void {
    fromEvent(this.searchInputRef.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        tap(() => this.transactionsService.updateLoadingState(true)),
        debounceTime(500),
        // search, discarding old events if new input come in
        switchMap((query: string) => this.searchService.searchTransactions(query)),
      )
      .subscribe({
        next: (results: Transaction[]) => {
          this.transactionsService.updateLoadingState(false);
          this.transactionsService.updateDisplayedTransactions(results);
          this.transactionsService.updatePageInfo({
            pageSize: results.length <= 10 ? results.length : 10,
            pageLength: results.length,
          });
        },
        error: (err) => {
          console.error(err);
          this.transactionsService.updateLoadingState(false);
        },
        complete: () => this.transactionsService.updateLoadingState(false),
      });
  }

  toggleDropdown(type: 'sort' | 'category') {
    const targetIcon = type === 'sort' ? this.sortIcon : this.categoryIcon;
    const rect = targetIcon.nativeElement.getBoundingClientRect();

    this.dropdownStyle = {
      top: `${rect.bottom + window.scrollY + 30}px`,
      //   right: `${rect.right}px`,
      right: '4.2%',
    };

    if (type === 'sort') {
      this.isSortOpen = !this.isSortOpen;
      this.isCategoryOpen = false;
    } else {
      this.isCategoryOpen = !this.isCategoryOpen;
      this.isSortOpen = false;
    }
  }

  handleSelection(option: string) {
    if (this.isSortOpen) {
    } else {
    }
    this.isSortOpen = false;
    this.isCategoryOpen = false;
  }
}

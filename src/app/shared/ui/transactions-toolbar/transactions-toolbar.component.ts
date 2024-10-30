import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Transaction } from '../../models/transaction-model';
import { SearchService } from '../../services/search.service';
import { debounceTime, fromEvent, map, switchMap, tap } from 'rxjs';
import { TransactionsService } from '../../../pages/transactions/transactions.service';

@Component({
  selector: 'app-transactions-toolbar',
  templateUrl: './transactions-toolbar.component.html',
  styleUrl: './transactions-toolbar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TransactionsToolbarComponent implements AfterViewInit {
  private searchService = inject(SearchService);
  private transactionsService = inject(TransactionsService);
  @ViewChild('searchbox') searchInputRef!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    console.log(
      fromEvent(this.searchInputRef.nativeElement, 'keyup')
        .pipe(
          map((e: any) => e.target.value),
          tap(() => this.transactionsService.loadingSearchResults.emit(true)),
          debounceTime(500),
          // search, discarding old events if new input come in
          switchMap((query: string) => this.searchService.search(query)),
        )
        .subscribe({
          next: (results: Transaction[]) => {
            this.transactionsService.loadingSearchResults.emit(false);
            this.transactionsService.SearchResults.emit(results);
          },
          error: (err) => {
            console.error(err);
            this.transactionsService.loadingSearchResults.emit(false);
          },
          complete: () => this.transactionsService.loadingSearchResults.emit(false),
        }),
    );
  }

  isSortOpen = false;
  isCategoryOpen = false;
  dropdownStyle = { top: '0px', right: '0px' };

  sortOptionSelected = 'Latest';
  categorySelected = 'All Transactions';

  sortByOptions = ['Latest', 'Oldest', 'A to Z', 'Z to A', 'Highest', 'Lowest'];
  categoryOptions = [
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

  @ViewChild('sortIcon', { static: false }) sortIcon!: ElementRef;
  @ViewChild('categoryIcon', { static: false }) categoryIcon!: ElementRef;

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
      this.sortOptionSelected = option;
    } else {
      this.categorySelected = option;
    }
    this.isSortOpen = false;
    this.isCategoryOpen = false;
  }
}

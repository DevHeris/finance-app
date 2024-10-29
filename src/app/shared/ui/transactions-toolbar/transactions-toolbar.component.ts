import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-transactions-toolbar',
  templateUrl: './transactions-toolbar.component.html',
  styleUrl: './transactions-toolbar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TransactionsToolbarComponent implements AfterViewInit {
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

  ngAfterViewInit() {}

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

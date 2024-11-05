import { Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Pot } from '../../models/pot-model';
import { MatDialog } from '@angular/material/dialog';
import { AddMoneyModalComponent } from '../add-money-modal/add-money-modal.component';

@Component({
  selector: 'app-pot-item',
  templateUrl: './pot-item.component.html',
  styleUrl: './pot-item.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PotItemComponent implements OnInit {
  @Input() pot!: Pot;
  progressValue: number = 0;
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.progressValue = (this.pot.total / this.pot.target) * 100;
  }

  openAddMoneyModal(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddMoneyModalComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.pot,
    });
  }
}

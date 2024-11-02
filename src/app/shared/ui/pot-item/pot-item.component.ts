import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Pot } from '../../models/pot-model';

@Component({
  selector: 'app-pot-item',
  templateUrl: './pot-item.component.html',
  styleUrl: './pot-item.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PotItemComponent implements OnInit {
  @Input() pot!: Pot;
  progressValue: number = 0;
  ngOnInit(): void {
    this.progressValue = (this.pot.total / this.pot.target) * 100;
  }
}

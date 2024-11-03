import { Component, Input } from '@angular/core';
import { Pot } from '../../models/pot-model';

@Component({
  selector: 'app-overview-pot-list-item',
  templateUrl: './overview-pot-list-item.component.html',
  styleUrl: './overview-pot-list-item.component.css',
})
export class OverviewPotListItemComponent {
  @Input() pot!: Pot;
}

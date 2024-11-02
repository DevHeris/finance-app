import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PotsService } from './pots.service';
import { Pot } from '../../shared/models/pot-model';

@Component({
  selector: 'app-pots',
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.css',
})
export class PotsComponent implements OnInit {
  private titleService = inject(Title);
  private potsService = inject(PotsService);
  title = 'Finance | Pots';

  pots: Pot[] = [];

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.pots = this.potsService.getPots();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PotsService } from './pots.service';
import { Pot } from '../../shared/models/pot-model';
import { MatDialog } from '@angular/material/dialog';
import { AddPotModalComponent } from '../../shared/ui/add-pot-modal/add-pot-modal.component';

@Component({
  selector: 'app-pots',
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.css',
})
export class PotsComponent implements OnInit {
  private titleService = inject(Title);
  private potsService = inject(PotsService);

  private dialog = inject(MatDialog);
  title = 'Finance | Pots';

  pots: Pot[] = [];

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.potsService.getPotsObservable().subscribe({
      next: (pots) => {
        this.pots = pots;
      },
    });
  }

  openAddPotModal(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddPotModalComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

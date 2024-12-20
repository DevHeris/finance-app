import { Injectable } from '@angular/core';
import { Pot } from '../../shared/models/pot-model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PotsService {
  private pots$ = new BehaviorSubject<Pot[]>(initialPots);

  getPots(): Pot[] {
    return this.pots$.getValue();
  }

  getPotsObservable(): Observable<Pot[]> {
    return this.pots$.asObservable();
  }

  updatePots(updatedPots: Pot[]): void {
    this.pots$.next(updatedPots);
  }

  updateSinglePot(potName: string, updatedPot: Pot) {
    const potToBeUpdated = this.getPots().find(
      (pot) => pot.name.toLowerCase() === potName.toLowerCase(),
    );
    if (potToBeUpdated) {
      // Used map to iterate through the pots array.
      // then for the matching pot (based on name), spread the updatedPot object to create a new object with the updated values.
      // For other pots, the original pot object is retained.
      const updatedPots = this.getPots().map((pot) =>
        pot.name.toLowerCase() === potName.toLowerCase() ? { ...updatedPot } : pot,
      );
      this.updatePots(updatedPots);
    } else {
      console.error(`Pot with name "${potName}" not found.`);
    }
  }

  getFirstFourPots(): Pot[] {
    return this.getPots().slice(0, 4);
  }

  addPot(newPot: Pot): void {
    const updatedPots = [...this.pots$.getValue(), newPot];
    this.updatePots(updatedPots);
  }
}

const initialPots = [
  {
    name: 'Savings',
    target: 2000.0,
    total: 159.0,
    theme: '#277C78',
  },
  {
    name: 'Concert Ticket',
    target: 150.0,
    total: 110.0,
    theme: '#626070',
  },
  {
    name: 'Gift',
    target: 150.0,
    total: 40.0,
    theme: '#82C9D7',
  },
  {
    name: 'New Laptop',
    target: 1000.0,
    total: 10.0,
    theme: '#F2CDAC',
  },
  {
    name: 'Holiday',
    target: 1440.0,
    total: 531.0,
    theme: '#826CB0',
  },
];

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private countSubject = new BehaviorSubject<number>(0);
  public count = this.countSubject.asObservable();

  constructor() { }

  add(): void {
    this.countSubject.next(this.countSubject.value + 1);
  }

  substract(): void {
    const value = this.countSubject.value;

    if (value !== 0) {
      this.countSubject.next(value - 1);
    }
  }
}

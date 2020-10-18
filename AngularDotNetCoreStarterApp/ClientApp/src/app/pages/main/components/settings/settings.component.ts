import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CounterService } from 'src/app/service/counter.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  counter = 0;
  bool: boolean;

  private counterSubs: Subscription;

  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
    this.counterSubs = this.counterService.count.subscribe(v => this.counter = v);
  }

  ngOnDestroy(): void {
    this.counterSubs?.unsubscribe();
  }

  add(): void {
    console.log(this.bool);
    this.counterService.add();
  }

  substract(): void {
    this.counterService.substract();
  }

}

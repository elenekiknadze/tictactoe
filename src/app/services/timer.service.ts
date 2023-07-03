import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  get counter() {
    return this._counter;
  }
  private _counter = 0;
  private interval: ReturnType<typeof setInterval> | undefined;

  startCounter() {
    if (this.interval) {
      this.stopCounter();
    }
    this._counter = 0;
    this.interval = setInterval(() => {
      this._counter++;
      console.log('timer');
    }, 1000);
    console.log(this.interval);
  }

  stopCounter() {
    const interval = this.interval;
    if (interval) {
      clearInterval(interval);
    }
  }
}

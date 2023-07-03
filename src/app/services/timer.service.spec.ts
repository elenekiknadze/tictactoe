import { TestBed } from '@angular/core/testing';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should increase counter', () => {
    service.startCounter();
    jest.runOnlyPendingTimers();
    expect(service.counter > 0).toBeTruthy();
    service.stopCounter();
  });

  it('should not increase counter under 1 second', () => {
    service.startCounter();
    jest.advanceTimersByTime(500);
    expect(service.counter > 0).toBeFalsy();
    service.stopCounter();
  });
});

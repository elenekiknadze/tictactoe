import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResolverService } from '../../services/resolver.service';
import { AuthService } from '../../services/auth.service';

import { MainPageComponent } from './main-page.component';
import { SCOREBOARD_SERVICE_TOKEN } from '../../services/scoreboard.abstract.service';
import { NUMBER_OF_SCORES } from '../../tokens/number-of-scores.token';
import { TimerService } from '../../services/timer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MAT_DIALOG_MOCK = {
  open: () => ({
    afterClosed: jest.fn().mockReturnValue(true),
  }),
};
describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //figure out why I need BrowserAnimationsModule here
      imports: [MainPageComponent, BrowserAnimationsModule],
      providers: [
        {
          provide: AuthService,
          useValue: { player: 'x', computer: 'o', name: 'someName' },
        },
        {
          provide: SCOREBOARD_SERVICE_TOKEN,
          useValue: {
            addScore: jest.fn(),
            calculateScore: jest.fn().mockReturnValue(100),
          },
        },
        {
          provide: NUMBER_OF_SCORES,
          useValue: 10,
        },
        ResolverService,
        {
          provide: TimerService,
          useValue: {
            stopCounter: jest.fn(),
            startCounter: jest.fn(),
            count: 10,
          },
        },
      ],
    });
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

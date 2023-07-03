import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResolverService } from '../../services/resolver.service';
import { AuthService } from '../../services/auth.service';
import { ScoreboardService } from '../../services/scoreboard.service';

import { MainPageComponent } from './main-page.component';
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
      imports: [MainPageComponent, BrowserAnimationsModule],
      providers: [
        {
          provide: AuthService,
          useValue: { player: 'x', computer: 'o', name: 'someName' },
        },
        {
          provide: ScoreboardService,
          useValue: { addScore: jest.fn() },
        },
        {
          provide: TimerService,
          useValue: {
            stopCounter: jest.fn(),
            startCounter: jest.fn(),
            counter: 0,
          },
        },
        ResolverService,
      ],
    });
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

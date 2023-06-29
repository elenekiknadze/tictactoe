import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreboardService } from '../../services/scoreboard.service';
import { AuthService } from '../../services/auth.service';

import { ScoreboardComponent } from './scoreboard.component';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScoreboardComponent],
      providers: [
        {
          provide: AuthService,
          useValue: { player: 'x', computer: 'o', name: 'someName' },
        },
        {
          provide: ScoreboardService,
          useValue: { scores: [] },
        },
      ],
    });
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

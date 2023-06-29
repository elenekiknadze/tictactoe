import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ResolverService } from '../../services/resolver.service';
import { AuthService } from '../../services/auth.service';
import { ScoreboardService } from '../../services/scoreboard.service';

import { MainPageComponent } from './main-page.component';

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
      imports: [MainPageComponent],
      providers: [
        {
          provide: AuthService,
          useValue: { player: 'x', computer: 'o', name: 'someName' },
        },
        {
          provide: ScoreboardService,
          useValue: { addScore: jest.fn() },
        },
        // {
        //   provide: MatDialog,
        //   useValue: MAT_DIALOG_MOCK,
        // },
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

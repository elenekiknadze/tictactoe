import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreIconComponent } from './score-icon.component';

describe('ScoreIconComponent', () => {
  let component: ScoreIconComponent;
  let fixture: ComponentFixture<ScoreIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreIconComponent]
    });
    fixture = TestBed.createComponent(ScoreIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

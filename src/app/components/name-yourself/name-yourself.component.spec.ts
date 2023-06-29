import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NameYourselfComponent } from './name-yourself.component';

describe('NameYourselfComponent', () => {
  let component: NameYourselfComponent;
  let fixture: ComponentFixture<NameYourselfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NameYourselfComponent, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jest.fn() },
        },
      ],
    });
    fixture = TestBed.createComponent(NameYourselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

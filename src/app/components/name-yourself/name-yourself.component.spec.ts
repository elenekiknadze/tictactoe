import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameYourselfComponent } from './name-yourself.component';

describe('NameYourselfComponent', () => {
  let component: NameYourselfComponent;
  let fixture: ComponentFixture<NameYourselfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NameYourselfComponent]
    });
    fixture = TestBed.createComponent(NameYourselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

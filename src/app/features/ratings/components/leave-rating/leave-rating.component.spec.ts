import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRatingComponent } from './leave-rating.component';

describe('LeaveRatingComponent', () => {
  let component: LeaveRatingComponent;
  let fixture: ComponentFixture<LeaveRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRideDialogComponent } from './edit-ride-dialog.component';

describe('EditRideDialogComponent', () => {
  let component: EditRideDialogComponent;
  let fixture: ComponentFixture<EditRideDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRideDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrintComponent } from './edit-print.component';

describe('EditPrintComponent', () => {
  let component: EditPrintComponent;
  let fixture: ComponentFixture<EditPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

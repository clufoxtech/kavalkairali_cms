import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingTypeComponent } from './packing-type.component';

describe('PackingTypeComponent', () => {
  let component: PackingTypeComponent;
  let fixture: ComponentFixture<PackingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

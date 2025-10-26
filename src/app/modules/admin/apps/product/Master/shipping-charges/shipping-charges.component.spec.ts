import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingChargesComponent } from './shipping-charges.component';

describe('ShippingChargesComponent', () => {
  let component: ShippingChargesComponent;
  let fixture: ComponentFixture<ShippingChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingChargesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

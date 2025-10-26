import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePincodeComponent } from './zone-pincode.component';

describe('ZonePincodeComponent', () => {
  let component: ZonePincodeComponent;
  let fixture: ComponentFixture<ZonePincodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonePincodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonePincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

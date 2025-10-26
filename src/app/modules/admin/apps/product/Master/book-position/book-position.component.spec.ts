import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPositionComponent } from './book-position.component';

describe('BookPositionComponent', () => {
  let component: BookPositionComponent;
  let fixture: ComponentFixture<BookPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

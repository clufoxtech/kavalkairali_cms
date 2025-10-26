import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadEbookComponent } from './read-ebook.component';

describe('ReadEbookComponent', () => {
  let component: ReadEbookComponent;
  let fixture: ComponentFixture<ReadEbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadEbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadEbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

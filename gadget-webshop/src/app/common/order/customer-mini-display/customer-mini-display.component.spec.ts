import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMiniDisplayComponent } from './customer-mini-display.component';

describe('CustomerMiniDisplayComponent', () => {
  let component: CustomerMiniDisplayComponent;
  let fixture: ComponentFixture<CustomerMiniDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMiniDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMiniDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

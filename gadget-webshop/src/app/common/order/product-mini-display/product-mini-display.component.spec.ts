import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMiniDisplayComponent } from './product-mini-display.component';

describe('ProductMiniDisplayComponent', () => {
  let component: ProductMiniDisplayComponent;
  let fixture: ComponentFixture<ProductMiniDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMiniDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMiniDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

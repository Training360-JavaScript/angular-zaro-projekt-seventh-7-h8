import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillStatsComponent } from './bill-stats.component';

describe('BillStatsComponent', () => {
  let component: BillStatsComponent;
  let fixture: ComponentFixture<BillStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TitleCommunicatiorService } from './title-communicatior.service';

describe('TitleCommunicatiorService', () => {
  let service: TitleCommunicatiorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleCommunicatiorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

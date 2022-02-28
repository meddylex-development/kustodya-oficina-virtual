import { TestBed } from '@angular/core/testing';

import { MenuProfileService } from './menu-profile.service';

describe('MenuProfileService', () => {
  let service: MenuProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SongResolverService } from './song-resolver.service';

describe('SongServiceResolverService', () => {
  let service: SongResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

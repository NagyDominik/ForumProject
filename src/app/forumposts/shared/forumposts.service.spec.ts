import { TestBed } from '@angular/core/testing';

import { ForumpostsService } from './forumposts.service';

describe('ForumpostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForumpostsService = TestBed.get(ForumpostsService);
    expect(service).toBeTruthy();
  });
});

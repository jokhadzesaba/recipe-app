import { TestBed } from '@angular/core/testing';

import { RecipeGuardGuard } from './recipe-guard.guard';

describe('RecipeGuardGuard', () => {
  let guard: RecipeGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecipeGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

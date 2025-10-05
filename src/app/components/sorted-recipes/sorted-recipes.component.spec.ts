import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedRecipesComponent } from './sorted-recipes.component';

describe('SortedRecipesComponent', () => {
  let component: SortedRecipesComponent;
  let fixture: ComponentFixture<SortedRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortedRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

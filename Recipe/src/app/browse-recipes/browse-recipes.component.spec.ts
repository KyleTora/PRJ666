import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRecipesComponent } from './browse-recipes.component';

describe('BrowseRecipesComponent', () => {
  let component: BrowseRecipesComponent;
  let fixture: ComponentFixture<BrowseRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

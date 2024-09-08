import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFilteringComponent } from './dynamic-filtering.component';

describe('DynamicFilteringComponent', () => {
  let component: DynamicFilteringComponent;
  let fixture: ComponentFixture<DynamicFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFilteringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

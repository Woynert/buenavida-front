import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVitrinaComponent } from './view-vitrina.component';

describe('ViewVitrinaComponent', () => {
  let component: ViewVitrinaComponent;
  let fixture: ComponentFixture<ViewVitrinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVitrinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVitrinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

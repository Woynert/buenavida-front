import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitrinaFilterComponent } from './vitrina-filter.component';

describe('VitrinaFilterComponent', () => {
  let component: VitrinaFilterComponent;
  let fixture: ComponentFixture<VitrinaFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitrinaFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitrinaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

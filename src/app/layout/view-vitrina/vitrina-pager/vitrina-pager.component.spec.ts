import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitrinaPagerComponent } from './vitrina-pager.component';

describe('VitrinaPagerComponent', () => {
  let component: VitrinaPagerComponent;
  let fixture: ComponentFixture<VitrinaPagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitrinaPagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitrinaPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

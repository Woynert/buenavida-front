import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSigninComponent } from './view-signin.component';

describe('ViewSigninComponent', () => {
  let component: ViewSigninComponent;
  let fixture: ComponentFixture<ViewSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSigninComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

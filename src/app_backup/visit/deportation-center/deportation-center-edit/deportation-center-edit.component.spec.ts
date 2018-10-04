import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeportationCenterEditComponent } from './deportation-center-edit.component';

describe('DeportationCenterEditComponent', () => {
  let component: DeportationCenterEditComponent;
  let fixture: ComponentFixture<DeportationCenterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeportationCenterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeportationCenterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

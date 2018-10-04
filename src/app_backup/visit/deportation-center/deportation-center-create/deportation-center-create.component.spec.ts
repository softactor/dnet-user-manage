import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeportationCenterCreateComponent } from './deportation-center-create.component';

describe('DeportationCenterCreateComponent', () => {
  let component: DeportationCenterCreateComponent;
  let fixture: ComponentFixture<DeportationCenterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeportationCenterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeportationCenterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

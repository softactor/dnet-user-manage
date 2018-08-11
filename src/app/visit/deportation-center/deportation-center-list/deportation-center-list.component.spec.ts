import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeportationCenterListComponent } from './deportation-center-list.component';

describe('DeportationCenterListComponent', () => {
  let component: DeportationCenterListComponent;
  let fixture: ComponentFixture<DeportationCenterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeportationCenterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeportationCenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

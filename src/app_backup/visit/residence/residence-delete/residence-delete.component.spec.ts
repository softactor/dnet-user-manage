import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceDeleteComponent } from './residence-delete.component';

describe('ResidenceDeleteComponent', () => {
  let component: ResidenceDeleteComponent;
  let fixture: ComponentFixture<ResidenceDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenceDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

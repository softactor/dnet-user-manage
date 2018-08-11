import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceCreateComponent } from './residence-create.component';

describe('ResidenceCreateComponent', () => {
  let component: ResidenceCreateComponent;
  let fixture: ComponentFixture<ResidenceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

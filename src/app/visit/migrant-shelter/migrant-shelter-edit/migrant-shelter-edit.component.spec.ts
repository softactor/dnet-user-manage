import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrantShelterEditComponent } from './migrant-shelter-edit.component';

describe('MigrantShelterEditComponent', () => {
  let component: MigrantShelterEditComponent;
  let fixture: ComponentFixture<MigrantShelterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrantShelterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrantShelterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

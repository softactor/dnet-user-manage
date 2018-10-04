import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrantShelterCreateComponent } from './migrant-shelter-create.component';

describe('MigrantShelterCreateComponent', () => {
  let component: MigrantShelterCreateComponent;
  let fixture: ComponentFixture<MigrantShelterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrantShelterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrantShelterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

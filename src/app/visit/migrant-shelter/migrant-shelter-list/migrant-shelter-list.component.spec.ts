import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrantShelterListComponent } from './migrant-shelter-list.component';

describe('MigrantShelterListComponent', () => {
  let component: MigrantShelterListComponent;
  let fixture: ComponentFixture<MigrantShelterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrantShelterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrantShelterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

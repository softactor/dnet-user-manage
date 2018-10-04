import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JailListComponent } from './jail-list.component';

describe('JailListComponent', () => {
  let component: JailListComponent;
  let fixture: ComponentFixture<JailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JailEditComponent } from './jail-edit.component';

describe('JailEditComponent', () => {
  let component: JailEditComponent;
  let fixture: ComponentFixture<JailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

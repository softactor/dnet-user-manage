import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JailCreateComponent } from './jail-create.component';

describe('JailCreateComponent', () => {
  let component: JailCreateComponent;
  let fixture: ComponentFixture<JailCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JailCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

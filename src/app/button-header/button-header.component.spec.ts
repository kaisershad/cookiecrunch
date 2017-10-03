import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonHeaderComponent } from './button-header.component';

describe('ButtonHeaderComponent', () => {
  let component: ButtonHeaderComponent;
  let fixture: ComponentFixture<ButtonHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

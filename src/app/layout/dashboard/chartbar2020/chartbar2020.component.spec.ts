import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chartbar2020Component } from './chartbar2020.component';

describe('Chartbar2020Component', () => {
  let component: Chartbar2020Component;
  let fixture: ComponentFixture<Chartbar2020Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chartbar2020Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chartbar2020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

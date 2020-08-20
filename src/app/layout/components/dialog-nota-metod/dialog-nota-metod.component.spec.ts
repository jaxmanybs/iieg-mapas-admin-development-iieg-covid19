import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotaMetodComponent } from './dialog-nota-metod.component';

describe('DialogNotaMetodComponent', () => {
  let component: DialogNotaMetodComponent;
  let fixture: ComponentFixture<DialogNotaMetodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNotaMetodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNotaMetodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

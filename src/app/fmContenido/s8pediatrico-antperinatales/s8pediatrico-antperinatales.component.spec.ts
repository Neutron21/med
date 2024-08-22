import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8pediatricoAntperinatalesComponent } from './s8pediatrico-antperinatales.component';

describe('S8pediatricoAntperinatalesComponent', () => {
  let component: S8pediatricoAntperinatalesComponent;
  let fixture: ComponentFixture<S8pediatricoAntperinatalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8pediatricoAntperinatalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8pediatricoAntperinatalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

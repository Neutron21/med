import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S1datosGeneralesComponent } from './s1datos-generales.component';

describe('S1datosGeneralesComponent', () => {
  let component: S1datosGeneralesComponent;
  let fixture: ComponentFixture<S1datosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S1datosGeneralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S1datosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S9observacionesComponent } from './s9observaciones.component';

describe('S9observacionesComponent', () => {
  let component: S9observacionesComponent;
  let fixture: ComponentFixture<S9observacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S9observacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S9observacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

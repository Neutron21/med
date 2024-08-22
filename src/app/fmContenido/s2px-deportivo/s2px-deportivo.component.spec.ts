import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S2pxDeportivoComponent } from './s2px-deportivo.component';

describe('S2pxDeportivoComponent', () => {
  let component: S2pxDeportivoComponent;
  let fixture: ComponentFixture<S2pxDeportivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S2pxDeportivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S2pxDeportivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

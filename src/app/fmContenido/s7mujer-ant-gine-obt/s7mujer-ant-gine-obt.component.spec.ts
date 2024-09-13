import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S7mujerAntGineObtComponent } from './s7mujer-ant-gine-obt.component';

describe('S7mujerAntGineObtComponent', () => {
  let component: S7mujerAntGineObtComponent;
  let fixture: ComponentFixture<S7mujerAntGineObtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S7mujerAntGineObtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S7mujerAntGineObtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


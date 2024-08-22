import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6antNopatologicosComponent } from './s6ant-nopatologicos.component';

describe('S6antNopatologicosComponent', () => {
  let component: S6antNopatologicosComponent;
  let fixture: ComponentFixture<S6antNopatologicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6antNopatologicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6antNopatologicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

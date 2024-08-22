import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S5antPatologicosComponent } from './s5ant-patologicos.component';

describe('S5antPatologicosComponent', () => {
  let component: S5antPatologicosComponent;
  let fixture: ComponentFixture<S5antPatologicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S5antPatologicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S5antPatologicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

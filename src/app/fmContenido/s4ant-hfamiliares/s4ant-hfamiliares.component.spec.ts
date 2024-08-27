import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S4antHfamiliaresComponent } from './s4ant-hfamiliares.component';

describe('S4antHfamiliaresComponent', () => {
  let component: S4antHfamiliaresComponent;
  let fixture: ComponentFixture<S4antHfamiliaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S4antHfamiliaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S4antHfamiliaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

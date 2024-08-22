import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S3medidasFisicasComponent } from './s3medidas-fisicas.component';

describe('S3medidasFisicasComponent', () => {
  let component: S3medidasFisicasComponent;
  let fixture: ComponentFixture<S3medidasFisicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S3medidasFisicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S3medidasFisicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

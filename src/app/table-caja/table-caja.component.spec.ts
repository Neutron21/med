import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCajaComponent } from './table-caja.component';

describe('TableCajaComponent', () => {
  let component: TableCajaComponent;
  let fixture: ComponentFixture<TableCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

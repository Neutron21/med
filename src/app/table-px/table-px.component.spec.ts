import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePxComponent } from './table-px.component';

describe('TablePxComponent', () => {
  let component: TablePxComponent;
  let fixture: ComponentFixture<TablePxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

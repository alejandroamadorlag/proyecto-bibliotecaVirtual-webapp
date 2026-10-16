import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarPrestamo } from './eliminar-prestamo';

describe('EliminarPrestamo', () => {
  let component: EliminarPrestamo;
  let fixture: ComponentFixture<EliminarPrestamo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarPrestamo],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarPrestamo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

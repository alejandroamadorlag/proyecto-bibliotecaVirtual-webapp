import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPrestamo } from './registrar-prestamo';

describe('RegistrarPrestamo', () => {
  let component: RegistrarPrestamo;
  let fixture: ComponentFixture<RegistrarPrestamo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPrestamo],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarPrestamo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

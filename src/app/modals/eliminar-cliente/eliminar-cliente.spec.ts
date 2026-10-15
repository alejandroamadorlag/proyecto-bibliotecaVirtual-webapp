import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarCliente } from './eliminar-cliente';

describe('EliminarCliente', () => {
  let component: EliminarCliente;
  let fixture: ComponentFixture<EliminarCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarCliente],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarGenero } from './eliminar-genero';

describe('EliminarGenero', () => {
  let component: EliminarGenero;
  let fixture: ComponentFixture<EliminarGenero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarGenero],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarGenero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

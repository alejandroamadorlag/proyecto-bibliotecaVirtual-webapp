import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarAutor } from './eliminar-autor';

describe('EliminarAutor', () => {
  let component: EliminarAutor;
  let fixture: ComponentFixture<EliminarAutor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarAutor],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarAutor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

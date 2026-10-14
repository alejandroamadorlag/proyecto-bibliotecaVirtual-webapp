import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosScreen } from './usuarios-screen';

describe('UsuariosScreen', () => {
  let component: UsuariosScreen;
  let fixture: ComponentFixture<UsuariosScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

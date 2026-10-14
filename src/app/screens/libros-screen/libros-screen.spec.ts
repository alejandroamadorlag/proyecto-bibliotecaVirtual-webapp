import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosScreen } from './libros-screen';

describe('LibrosScreen', () => {
  let component: LibrosScreen;
  let fixture: ComponentFixture<LibrosScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrosScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(LibrosScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

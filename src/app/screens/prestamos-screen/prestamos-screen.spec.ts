import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrestamosScreen } from './prestamos-screen';

describe('PrestamosScreen', () => {
  let component: PrestamosScreen;
  let fixture: ComponentFixture<PrestamosScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamosScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(PrestamosScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

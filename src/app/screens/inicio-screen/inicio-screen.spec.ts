import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioScreen } from './inicio-screen';

describe('InicioScreen', () => {
  let component: InicioScreen;
  let fixture: ComponentFixture<InicioScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

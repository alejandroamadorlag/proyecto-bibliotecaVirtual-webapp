import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerosScreen } from './generos-screen';

describe('GenerosScreen', () => {
  let component: GenerosScreen;
  let fixture: ComponentFixture<GenerosScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerosScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerosScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

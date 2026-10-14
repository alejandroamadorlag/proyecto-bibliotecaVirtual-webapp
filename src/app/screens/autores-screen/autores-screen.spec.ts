import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoresScreen } from './autores-screen';

describe('AutoresScreen', () => {
  let component: AutoresScreen;
  let fixture: ComponentFixture<AutoresScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoresScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoresScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroGenero } from './registro-genero';

describe('RegistroGenero', () => {
  let component: RegistroGenero;
  let fixture: ComponentFixture<RegistroGenero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroGenero],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroGenero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

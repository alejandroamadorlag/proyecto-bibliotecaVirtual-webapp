import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroLibro } from './registro-libro';

describe('RegistroLibro', () => {
  let component: RegistroLibro;
  let fixture: ComponentFixture<RegistroLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroLibro],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroLibro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

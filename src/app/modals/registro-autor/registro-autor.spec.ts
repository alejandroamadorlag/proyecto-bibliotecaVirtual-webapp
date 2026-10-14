import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroAutor } from './registro-autor';

describe('RegistroAutor', () => {
  let component: RegistroAutor;
  let fixture: ComponentFixture<RegistroAutor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAutor],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroAutor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroBiblio } from './registro-biblio';

describe('RegistroBiblio', () => {
  let component: RegistroBiblio;
  let fixture: ComponentFixture<RegistroBiblio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroBiblio],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroBiblio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

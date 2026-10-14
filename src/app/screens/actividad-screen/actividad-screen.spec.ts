import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadScreen } from './actividad-screen';

describe('ActividadScreen', () => {
  let component: ActividadScreen;
  let fixture: ComponentFixture<ActividadScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

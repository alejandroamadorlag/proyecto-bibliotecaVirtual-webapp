import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesScreen } from './clientes-screen';

describe('ClientesScreen', () => {
  let component: ClientesScreen;
  let fixture: ComponentFixture<ClientesScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

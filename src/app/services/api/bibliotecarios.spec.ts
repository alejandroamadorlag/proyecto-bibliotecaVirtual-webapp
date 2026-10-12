import { TestBed } from '@angular/core/testing';
import { Bibliotecarios } from './bibliotecarios';

describe('Bibliotecarios', () => {
  let service: Bibliotecarios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bibliotecarios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

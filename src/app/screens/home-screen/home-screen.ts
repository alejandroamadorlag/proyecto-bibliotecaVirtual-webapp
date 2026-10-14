import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../partials/sidebar/sidebar';
import { FacadeService } from '../../services/facade';

@Component({
  selector: 'app-home-screen',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.scss'
})
export class HomeScreen implements OnInit {
  public rol: string = "";

  constructor(private facadeService: FacadeService) {}

  ngOnInit() {
    this.rol = this.facadeService.getUserGroup();
  }
}

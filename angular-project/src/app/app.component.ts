import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Titulo2';
  mostrarTitulo = true;

  cuandoDenClick() {
    this.mostrarTitulo = !this.mostrarTitulo;
  }
}

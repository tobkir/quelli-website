import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-footer', // Oder Ihr Footer-Komponenten-Selektor
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [MatIconModule, RouterLink],
  standalone: true
})
export class FooterComponent {
  title = 'Quellegeister Bad Peterstal e.V.'; // Ihr aktueller Titel

  currentYear: number; // Hier deklarieren

  constructor() {
    this.currentYear = new Date().getFullYear(); // Im Konstruktor initialisieren
  }
}

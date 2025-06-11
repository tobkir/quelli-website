import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import { ThemeStore } from '../../services/theme.store';
import {MatCardModule} from '@angular/material/card';
import {NumberCardModule} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatCardModule, NumberCardModule]
})
export class HomeComponent implements OnInit {

  private themeStore = inject(ThemeStore);
  values: any[] = [];

  // ngx-charts Konfiguration
  chartScheme = computed(() => { // NEU: chartScheme als computed Signal
    const theme = this.themeStore.theme(); // Wert des Signals abrufen
    if (theme === 'dark') {
      return { name: 'custom-dark', // Ein beliebiger Name
        selectable: true,
        group: 'custom', domain: ['#8ac0ff', '#9BCD9B', '#bec1ff', '#5a5a5a'] } as any; // Dark Mode Farben
    } else {
      return { name: 'custom-light', // Ein beliebiger Name
        selectable: true,
        group: 'custom', domain: ['#007bff', '#6AB04C', '#5a5cff', '#cccccc'] }as any; // Light Mode Farben
    }
  });

  cardColor = computed(() => { // NEU: cardColor als computed Signal
    const theme = this.themeStore.theme();
    return theme === 'dark' ? '#36393f' : '#fdfbff'; // Deine Dark/Light Card Farben
  });

  textColor = computed(() => { // NEU: textColor als computed Signal
    const theme = this.themeStore.theme();
    return theme === 'dark' ? '#f0f0f0' : '#1c1b1f'; // Deine Dark/Light Text Farben
  });



  ngOnInit(): void {
    let single = [
      {
        "name": "Mitglieder",
        "value": "150"
      },
      {
        "name": "Aktive",
        "value": "80"
      },
      {
        "name": "Gründungsjahr",
        "value": "1985"
      }
    ];

    this.values = [...single];
  }

}

import {Component, computed, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {InfoCardComponent} from '../info-card/info-card.component';
import {CommonModule, NgForOf} from '@angular/common';
import {ThemeStore} from '../../services/theme.store';
import {MemberCardComponent} from '../member-card/member-card.component';
import {TimelineComponent} from '../timeline/timeline.component';
import {CHRONIK_EVENTS, TimelineEvent} from '../../core/data/chronik-events.data';

@Component({
  selector: 'app-about',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    InfoCardComponent,
    CommonModule,
    MemberCardComponent,
    TimelineComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit{
  private themeStore = inject(ThemeStore);
  values: any[] = [];
  events: TimelineEvent[] = CHRONIK_EVENTS;

  // ngx-charts Konfiguration
  bandColors = computed(() => {
    const theme = this.themeStore.theme();
    if (theme === 'dark') {
      // Farben für die Balken im Dark Mode
      return ['#8ac0ff', '#718dfb', '#bee4ff', '#5a5a5a'];
    } else {
      // Farben für die Balken im Light Mode
      return ['#007bff', '#4c7eb0', '#71a2fd', '#cccccc'];
    }
  });

  cardBackgroundColor = computed(() => {
    const theme = this.themeStore.theme();
    return theme === 'dark' ? '#36393f' : '#fdfbff'; // Hintergrund der Info-Karte
  });

  textColor = computed(() => {
    const theme = this.themeStore.theme();
    return theme === 'dark' ? '#f0f0f0' : '#1c1b1f'; // Textfarbe der Info-Karte
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
        "value": "1985",
        "isYear": true
      }
    ];

    this.values = [...single];
  }
}

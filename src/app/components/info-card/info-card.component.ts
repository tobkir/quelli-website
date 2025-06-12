import { Component, input, Input, OnChanges, SimpleChanges, signal, effect } from '@angular/core'; // 'Input' und 'OnChanges' sind nicht mehr primär für Signals nötig, aber für die Umstellung behalten wir sie kurz
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-info-card',
  standalone: true, // Markiert die Komponente als Standalone
  imports: [CommonModule], // Fügt CommonModule zu Imports hinzu
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
  animations: [
    // Animation für den Hover-Effekt
    trigger('hoverCard', [
      state('normal', style({
        transform: 'scale(1)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      })),
      state('hovered', style({
        transform: 'scale(1.03)', // Leicht vergrößern
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' // Schatten verstärken
      })),
      transition('normal <=> hovered', [
        animate('200ms ease-in-out') // Sanfter Übergang
      ])
    ])
  ]
})
export class InfoCardComponent implements OnChanges {
  @Input({ required: true }) value: string | number = 0; // Wir bekommen den Wert als String oder Zahl
  @Input({ required: true }) label: string = '';
  @Input() bandColor: string = '#007bff'; // Standardfarbe, falls nicht übergeben
  @Input() cardBackgroundColor: string = '#f8f9fa';
  @Input() textColor: string = '#212529';
  @Input() isYear: boolean = false;

  displayValue = signal(0); // Internes Signal, das den animierten Wert hält
  private targetValue: number = 0; // Speichert den Zielwert für die Animation

  isHovered = signal(false); // Signal für den Hover-Status

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      // Wenn der Wert sich ändert, starten wir die Zähl-Animation
      const newValue = Number(this.value.toString().replace(/\./g, '')); // Punkte für Tausendertrennung entfernen
      if (!isNaN(newValue) && newValue !== this.targetValue) {
        this.targetValue = newValue;
        this.animateValue(this.targetValue);
      }
    }
  }

  private animateValue(target: number): void {
    const duration = 1000; // Dauer der Animation in ms
    const startValue = this.displayValue(); // Aktueller angezeigter Wert
    const range = target - startValue;
    let startTime: number | null = null;

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        // Lineare Interpolation (für komplexere Animationen Easing-Funktionen verwenden)
        const currentValue = startValue + range * progress;
        this.displayValue.set(Math.floor(currentValue)); // Ganzzahlige Darstellung
        requestAnimationFrame(step);
      } else {
        this.displayValue.set(target); // Endwert setzen
      }
    };

    requestAnimationFrame(step);
  }

  // Hilfsfunktion zur Formatierung des angezeigten Wertes (z.B. mit Tausenderpunkten)
  get formattedDisplayValue(): string {
    if (this.isYear) {
      return this.displayValue().toString(); // Für Jahre einfach als String zurückgeben
    } else {
      return this.displayValue().toLocaleString('de-DE'); // Für andere Zahlen formatieren
    }
  }

  onMouseEnter() {
    this.isHovered.set(true);
  }

  onMouseLeave() {
    this.isHovered.set(false);
  }
}

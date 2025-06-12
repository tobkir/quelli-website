import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common'; // NgIf, DecimalPipe (für die Formatierung) hinzufügen
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule], // CommonModule hinzufügen
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  animations: [
    // Animation für den Hover-Effekt (direkt auf den einzelnen Countdown-Items)
    trigger('hoverItem', [
      state('normal', style({
        transform: 'scale(1)',
        boxShadow: 'none' // Kein Schatten im Normalzustand
      })),
      state('hovered', style({
        transform: 'scale(1.05)', // Leicht vergrößern
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Leichter Schatten beim Hover
      })),
      transition('normal <=> hovered', [
        animate('200ms ease-in-out') // Sanfter Übergang
      ])
    ])
  ]
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input({ required: true }) targetDate!: string;

  // Signals für die Anzeige der animierten Werte
  displayDays = signal(0);
  displayHours = signal(0);
  displayMinutes = signal(0);
  displaySeconds = signal(0);

  // Signals für die tatsächlichen Zielwerte (nicht animiert)
  private actualDays = 0;
  private actualHours = 0;
  private actualMinutes = 0;
  private actualSeconds = 0;

  isExpired = signal(false);

  private countdownInterval: any;

  // Hover-Zustände für jedes Item separat
  hoveredState = signal<'days' | 'hours' | 'minutes' | 'seconds' | null>(null);

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private startCountdown(): void {
    const target = new Date(this.targetDate).getTime();

    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(this.countdownInterval);
        this.isExpired.set(true);
        this.updateAndAnimateValues(0, 0, 0, 0); // Alle Werte auf 0 setzen
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Nur animieren, wenn sich die Werte ändern
      if (this.actualDays !== days || this.actualHours !== hours ||
        this.actualMinutes !== minutes || this.actualSeconds !== seconds) {
        this.updateAndAnimateValues(days, hours, minutes, seconds);
      }

      this.isExpired.set(false);
    }, 1000);
  }

  private updateAndAnimateValues(days: number, hours: number, minutes: number, seconds: number): void {
    // Speichere die neuen Zielwerte
    this.actualDays = days;
    this.actualHours = hours;
    this.actualMinutes = minutes;
    this.actualSeconds = seconds;

    // Starte die Animation für jeden Wert
    this.animateSingleValue(this.displayDays, days);
    this.animateSingleValue(this.displayHours, hours);
    this.animateSingleValue(this.displayMinutes, minutes);
    this.animateSingleValue(this.displaySeconds, seconds);
  }


  private animateSingleValue(displaySignal: any, target: number): void {
    const duration = 500; // Etwas kürzere Animation für schnellen Übergang
    const startValue = displaySignal();
    const range = target - startValue;
    let startTime: number | null = null;

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        const currentValue = startValue + range * progress;
        displaySignal.set(Math.floor(currentValue));
        requestAnimationFrame(step);
      } else {
        displaySignal.set(target); // Endwert setzen
      }
    };

    requestAnimationFrame(step);
  }

  // Hover-Methoden für jedes Item
  onMouseEnter(item: 'days' | 'hours' | 'minutes' | 'seconds') {
    this.hoveredState.set(item);
  }

  onMouseLeave() {
    this.hoveredState.set(null);
  }
}

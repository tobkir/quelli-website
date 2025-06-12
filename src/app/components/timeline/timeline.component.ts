// src/app/components/timeline/timeline.component.ts

import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {TimelineEvent} from '../../core/data/chronik-events.data';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  @Input({ required: true }) events: TimelineEvent[] = [];
  @Input() lineColor: string = 'var(--mat-sys-primary)';
  @Input() dotColor: string = 'var(--mat-sys-primary)';
  @Input() cardBackgroundColor: string = 'var(--mat-sys-surface-container-low)';
  @Input() textColor: string = 'var(--mat-sys-on-surface)';

  @ViewChild('timelineLineRef') timelineLineRef!: ElementRef; // Referenz auf die Linie
  private observer!: IntersectionObserver;

  isLineVisible = signal(false); // Signal, das den Zustand der Linie steuert

  constructor(private elementRef: ElementRef) {} // ElementRef für den Container der Timeline

  ngOnInit(): void {
    // Observer initialisieren
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Wenn der Container sichtbar wird, setze isLineVisible auf true
          this.isLineVisible.set(true);
          // Optional: Observer stoppen, nachdem die Animation einmal gestartet wurde
          // this.observer.unobserve(this.elementRef.nativeElement);
        } else {
          // Optional: Animation zurücksetzen, wenn es aus dem Blickfeld scrollt
          // this.isLineVisible.set(false);
        }
      });
    }, {
      root: null, // Der Viewport ist der Root
      rootMargin: '0px',
      threshold: 0.1 // Die Linie wird sichtbar, wenn 10% des Timeline-Containers im Viewport sind
    });

    // Beobachte den gesamten Timeline-Container
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    // Observer aufräumen, um Memory Leaks zu vermeiden
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }
}

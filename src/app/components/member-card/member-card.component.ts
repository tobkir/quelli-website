// src/app/components/member-card/member-card.component.ts

import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Für *ngIf und NgOptimizedImage
import { MatIconModule } from '@angular/material/icon'; // Für das Mail-Symbol
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatIconButton} from '@angular/material/button'; // Für Animationen

@Component({
  selector: 'app-member-card',
  standalone: true, // Stelle sicher, dass es standalone ist, falls noch nicht geschehen
  imports: [
    CommonModule,
    MatIconModule,
    MatIconButton,
    // MatIconModule importieren
  ],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
  animations: [
    trigger('hoverMail', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(10px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('200ms ease-out')
      ]),
      transition('visible => hidden', [
        animate('200ms ease-in')
      ])
    ]),
    trigger('cardHover', [
      state('normal', style({
        transform: 'scale(1)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      })),
      state('hovered', style({
        transform: 'scale(1.03)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
      })),
      transition('normal <=> hovered', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class MemberCardComponent {
  @Input({ required: true }) imageUrl!: string; // Bildpfad
  @Input({ required: true }) names!: string[];
  @Input() function?: string;
  @Input() email?: string;                     // Optionale E-Mail-Adresse

  isHovered = signal(false); // Signal für den Hover-Zustand der gesamten Karte

  onMouseEnter(): void {
    this.isHovered.set(true);
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
  }

  openMailClient(): void {
    if (this.email) {
      window.location.href = `mailto:${this.email}`;
    }
  }
}

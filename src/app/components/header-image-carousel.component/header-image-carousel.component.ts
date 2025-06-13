// src/app/components/header-image-carousel/header-image-carousel.component.ts
import { Component, OnInit, OnDestroy, Input, signal, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, interval, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header-image-carousel',
  templateUrl: './header-image-carousel.component.html',
  styleUrls: ['./header-image-carousel.component.scss'],
  imports: [
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderImageCarouselComponent implements OnInit, OnDestroy {

  @Input() imageFolderPath: string = 'assets/header-images/';
  @Input() numberOfImages: number = 3;
  @Input() imagePrefix: string = 'header';
  @Input() imageExtension: string = '.jpg';

  @Input() intervalMs: number = 5000;
  @Input() fadeDurationMs: number = 1000; // Dauer des Ein- und Ausblendens

  @Input() altText: string = 'Vereins-Headerbild';
  @Input() width: number = 624;
  @Input() height: number = 163;

  private images: string[] = [];
  // currentDisplayedImageIndex verfolgt den Index des Bildes, das AKTUELL auf currentMainImagePath liegt
  private currentDisplayedImageIndex: number = -1; // Startet bei -1, da das erste Bild erst eingefadet wird

  currentMainImagePath: WritableSignal<string> = signal('');
  nextFadeImagePath: WritableSignal<string> = signal(''); // Wird nie leer sein
  nextImageOpacity: WritableSignal<number> = signal(0);

  // Wird verwendet, um zu steuern, ob ein Fade-In erwartet wird
  private expectingFadeIn: WritableSignal<boolean> = signal(false);

  private imageIntervalSubscription: Subscription | undefined;
  private fadeAnimationSubscription: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
    this.generateImagePaths();

    if (this.images.length === 0) {
      console.warn('HeaderImageCarouselComponent: Keine Bilder im angegebenen Ordner oder falsche Konfiguration.');
      return;
    }

    // Beim Initialisieren:
    // 1. Das Hauptbild ist (noch) leer oder ein Platzhalter.
    // 2. Setze das ERSTE Bild als das Bild, das als Nächstes eingefaded wird.
    this.currentDisplayedImageIndex = 0; // Der Index des ersten Bildes im Array
    this.nextFadeImagePath.set(this.images[this.currentDisplayedImageIndex]);
    this.nextImageOpacity.set(0); // Es startet unsichtbar.

    // 3. Manuell den ersten Fade-In auslösen.
    // Wir tun so, als ob startCrossfade() gerade für das erste Bild aufgerufen wurde.
    this.expectingFadeIn.set(true);

    // 4. Den Timer für den Abschluss des ersten Fades starten.
    // Dieser Timer wird nach fadeDurationMs das Hauptbild aktualisieren.
    this.fadeAnimationSubscription = timer(this.fadeDurationMs).pipe(
      finalize(() => {
        this.expectingFadeIn.set(false);
      })
    ).subscribe(() => {
      // Das Hauptbild wird auf das gerade eingefadete erste Bild aktualisiert.
      this.currentMainImagePath.set(this.nextFadeImagePath()); // Das aktuelle Fade-Bild wird zum Hauptbild

      // Das Überblend-Bild wird wieder unsichtbar gemacht und sein src ist das aktuelle Hauptbild
      this.nextFadeImagePath.set(this.currentMainImagePath()); // Es zeigt jetzt das gleiche Bild wie das Main-Image
      this.nextImageOpacity.set(0); // Macht es unsichtbar für den nächsten Zyklus
    });

    // Startet den Karussell-Loop NACHDEM der erste Fade abgeschlossen ist.
    // Der intervalMs sollte lang genug sein, damit der erste Fade durchläuft.
    this.imageIntervalSubscription = interval(this.intervalMs).subscribe(() => {
      this.startCrossfade();
    });
  }

  ngOnDestroy(): void {
    if (this.imageIntervalSubscription) {
      this.imageIntervalSubscription.unsubscribe();
    }
    if (this.fadeAnimationSubscription) {
      this.fadeAnimationSubscription.unsubscribe();
    }
  }

  private generateImagePaths(): void {
    this.images = [];
    for (let i = 1; i <= this.numberOfImages; i++) {
      this.images.push(`${this.imageFolderPath}${this.imagePrefix}${i}${this.imageExtension}`);
    }
  }

  private startCrossfade(): void {
    // Wenn bereits ein Fade-In erwartet wird, abbrechen
    if (this.expectingFadeIn()) {
      return;
    }

    this.expectingFadeIn.set(true); // Signalisiert, dass wir einen Fade-In erwarten

    // 1. Berechne den Index des NÄCHSTEN Bildes (das eingeblendet wird)
    this.currentDisplayedImageIndex = (this.currentDisplayedImageIndex + 1) % this.images.length;
    const pathOfNextImage = this.images[this.currentDisplayedImageIndex];

    // 2. Setze den Pfad des Überblend-Bildes und starte es unsichtbar.
    this.nextFadeImagePath.set(pathOfNextImage);
    this.nextImageOpacity.set(0); // Wichtig: Startet unsichtbar

    // Der Fade-In (Opazität auf 1 setzen) wird durch onFadeImageLoaded() ausgelöst,
    // sobald das Bild geladen ist.

    // 3. Timer für den Abschluss des Crossfades:
    this.fadeAnimationSubscription = timer(this.fadeDurationMs).pipe(
      finalize(() => {
        this.expectingFadeIn.set(false); // Fade-Prozess beendet
      })
    ).subscribe(() => {
      // 4. Das Hauptbild wird auf das neue Bild aktualisiert
      this.currentMainImagePath.set(pathOfNextImage);

      // 5. Das Überblend-Bild wird wieder auf den Pfad des aktuellen Hauptbildes gesetzt
      // und unsichtbar gemacht, bereit für den nächsten Zyklus.
      this.nextFadeImagePath.set(pathOfNextImage); // Es zeigt jetzt das gleiche Bild wie das Main-Image
      this.nextImageOpacity.set(0); // Macht es unsichtbar für den nächsten Zyklus
    });
  }

  // Diese Methode wird aufgerufen, wenn das "fade-image" fertig geladen ist
  onFadeImageLoaded(): void {
    // Das Bild sollte nur eingeblendet werden, wenn:
    // 1. Ein Fade-In erwartet wird (`expectingFadeIn()`).
    // 2. Das geladene Bild (`nextFadeImagePath()`) nicht bereits das Hauptbild ist
    //    (dies ist wichtig, da ngSrc Caching verwendet und das fade-image
    //     am Ende eines Zyklus den gleichen src wie das main-image hat).
    if (this.expectingFadeIn() && this.currentMainImagePath() !== this.nextFadeImagePath()) {
      this.nextImageOpacity.set(1); // Jetzt einblenden, nachdem das Bild geladen ist
    }
  }
}

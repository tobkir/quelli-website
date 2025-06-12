import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {TimelineComponent} from '../timeline/timeline.component';
import {CHRONIK_EVENTS, NEXT_EVENTS} from '../../core/data/chronik-events.data';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-fahrplan.component',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    TimelineComponent,
    MatButton
  ],
  templateUrl: './fahrplan.component.html',
  styleUrl: './fahrplan.component.scss'
})
export class FahrplanComponent {

  protected readonly events = NEXT_EVENTS;
}

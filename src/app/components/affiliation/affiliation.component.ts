import { Component } from '@angular/core';
import {InfoCardComponent} from '../info-card/info-card.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {NgForOf} from '@angular/common';
import {MemberCardComponent} from '../member-card/member-card.component';

@Component({
  selector: 'app-affiliation.component',
  imports: [
    InfoCardComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    NgForOf,
    MemberCardComponent
  ],
  templateUrl: './affiliation.component.html',
  styleUrl: './affiliation.component.scss'
})
export class AffiliationComponent {

}

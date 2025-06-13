import { Component } from '@angular/core';
import {InfoCardComponent} from '../info-card/info-card.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {NgForOf} from '@angular/common';
import {MemberCardComponent} from '../member-card/member-card.component';

@Component({
  selector: 'app-affiliation.component',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MemberCardComponent
  ],
  templateUrl: './affiliation.component.html',
  styleUrl: './affiliation.component.scss'
})
export class AffiliationComponent {

}

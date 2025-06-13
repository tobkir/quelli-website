import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {ImpressumComponent} from './components/impressum/impressum.component';
import {DataProtectionComponent} from './components/data-protection/data-protection.component';
import {FahrplanComponent} from './components/fahrplan/fahrplan.component';
import {AffiliationComponent} from './components/affiliation/affiliation.component';
import {MemoriamComponent} from './components/memoriam/memoriam.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "schedule", component: FahrplanComponent},
  {path: "impressum", component: ImpressumComponent},
  {path: "data-protection", component: DataProtectionComponent},
  {path: "affiliation", component: AffiliationComponent},
  {path: "memoriam", component: MemoriamComponent},

];

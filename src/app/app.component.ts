import {Component, inject, Signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ThemeStore} from './services/theme.store';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {FooterComponent} from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIconModule, MatCardModule,
    MatButtonModule, MatButtonToggleModule, FormsModule, NgOptimizedImage,
    MatListItem, RouterLink, MatSidenavModule, MatNavList, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private store = inject(ThemeStore);
  theme: Signal<string> = this.store.theme;

  updateTheme(theme: string) {
    this.store.updateTheme(theme)
  }
}

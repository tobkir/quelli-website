import {patchState, signalStore, withHooks, withMethods, withState} from "@ngrx/signals";
import {withDevtools} from "@angular-architects/ngrx-toolkit"
import {effect, inject} from "@angular/core";

interface SettingsState {
  theme: string;
}

const initialSettingsState: SettingsState = {
  theme: "light",
}


export const ThemeStore = signalStore(
  {providedIn: 'root'},
  withState<SettingsState>(
    initialSettingsState
  ),
  withMethods((store) => {

    return {
      loadSettings(): void {
        let theme = localStorage.getItem('app-theme');
        if (theme) {
          patchState(store, {theme});
        }
      },
      updateTheme(theme: string) : void{
        patchState(store, {theme});
        localStorage.setItem('app-theme', theme);
      }
    };
  }),
  withHooks({
      onInit({loadSettings, theme}) {
        loadSettings();
        effect(() => {
          const currentTheme = theme();
          if (currentTheme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.remove('light-theme');
          } else {
            document.documentElement.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
          }
        });
      },
      onDestroy(store) {
        console.log("Destroy!", store);
      }
    }
  ),
  withDevtools('settings')
);

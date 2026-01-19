import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TuiAppearance, TuiButton, TuiLink, TuiRoot } from '@taiga-ui/core';
import { ThemeService } from './services/theme.service';
import { TUI_DARK_MODE } from '@taiga-ui/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TuiRoot,
    TuiButton,
    TuiLink,
    TuiAppearance,
    RouterLink,
    RouterOutlet],
templateUrl: 'app.component.html',
providers: [
    {
      provide: TUI_DARK_MODE,
      useFactory: () => {
        const themeService = inject(ThemeService);
        return themeService.isDark;
      },
    },
  ],

})
export class AppComponent {
    protected readonly themeService = inject(ThemeService);
    protected readonly darkMode = inject(TUI_DARK_MODE);
    toggleMode(): void {
    this.darkMode.set(!this.darkMode());
  }
}
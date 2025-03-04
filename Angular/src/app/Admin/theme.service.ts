import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  switchTheme(theme: string) {
    const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
    themeLink.href = `assets/themes/${theme}/theme.css`;
  }
}
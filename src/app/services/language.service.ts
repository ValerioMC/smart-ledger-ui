import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selected_language';
  private readonly SUPPORTED_LANGUAGES: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage(): void {
    // Check if language is stored in localStorage
    const storedLang = localStorage.getItem(this.STORAGE_KEY);

    if (storedLang && this.isLanguageSupported(storedLang)) {
      this.setLanguage(storedLang);
    } else {
      // Detect browser language
      const browserLang = this.translate.getBrowserLang();
      const detectedLang = browserLang && this.isLanguageSupported(browserLang) ? browserLang : 'en';
      this.setLanguage(detectedLang);
    }
  }

  private isLanguageSupported(lang: string): boolean {
    return this.SUPPORTED_LANGUAGES.some(l => l.code === lang);
  }

  setLanguage(lang: string): void {
    if (this.isLanguageSupported(lang)) {
      this.translate.use(lang);
      localStorage.setItem(this.STORAGE_KEY, lang);
    }
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }

  getSupportedLanguages(): Language[] {
    return this.SUPPORTED_LANGUAGES;
  }

  getCurrentLanguageDetails(): Language | undefined {
    const currentLang = this.getCurrentLanguage();
    return this.SUPPORTED_LANGUAGES.find(l => l.code === currentLang);
  }
}

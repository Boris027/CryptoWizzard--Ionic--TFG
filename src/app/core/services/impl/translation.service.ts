import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Service responsible for handling app language translation.
 * Uses ngx-translate for managing translation resources.
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly LANG_KEY = 'SELECTED_LANGUAGE';

  /**
   * Creates an instance of TranslationService and initializes
   * the app language based on saved preferences or default.
   * 
   * @param translate - ngx-translate service instance.
   */
  constructor(
    private translate: TranslateService
  ) {
    this.initTranslate();
  }

  /**
   * Initializes the translation service by setting the language
   * to the saved preference in localStorage or the default 'en'.
   */
  initTranslate() {
    const savedLang = localStorage.getItem(this.LANG_KEY) || 'en';
    this.setLanguage(savedLang);
  }

  /**
   * Sets the current language for the app translations and
   * saves the selected language to localStorage.
   * 
   * @param lang - Language code to set (e.g. 'en', 'es').
   */
  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem(this.LANG_KEY, lang);
  }

  /**
   * Retrieves the currently active language code.
   * 
   * @returns Current language code as string.
   */
  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }
}
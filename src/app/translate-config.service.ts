import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class TranslateConfigService {
  
    currentLang: string;
  
    constructor(private translate: TranslateService)
    {
      this.currentLang = localStorage.getItem('revapp-lang');

      // add the supported languages
      this.translate.addLangs(['en', 'hu']);

      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('en');
    }
  
    initLanguage()
    {
        if (this.currentLang) {
            //this.translate.setDefaultLang(this.currentLang);
            this.translate.use(this.currentLang);
        }
        else {
            // the lang to use, if the lang isn't available, it will use the current loader to get them
            let browserLang =  this.translate.getBrowserLang();
            if (!browserLang.match(/en|hu/)) {
                browserLang = 'en';
            }
            this.currentLang = browserLang;
            //this.translate.setDefaultLang(this.currentLang);
            this.translate.use(browserLang);
            localStorage.setItem('revapp-lang', browserLang);
        }
        return this.currentLang;
    }
  
    setLanguage(setLang: string)
    {
        this.translate.use(setLang);
        localStorage.setItem('revapp-lang', setLang);
    }
  
    getCurrentLang() {
      return localStorage.getItem('revapp-lang');
    }
  
}

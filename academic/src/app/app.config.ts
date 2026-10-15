import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {routes} from './app.routes';
import {environment} from '../environments/environment';
import {TranslatedPaginatorIntl} from '../shared/presentation/components/translated-paginator-intl/translated-paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({prefix: environment.i18nPath, suffix: '.json'}),
      fallbackLang: environment.defaultLanguage,
      lang: environment.defaultLanguage
    }),
    {provide: MatPaginatorIntl, useClass: TranslatedPaginatorIntl}
  ]
};

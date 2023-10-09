// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core'
import { AppComponent } from './app/app.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from './app/app-routing.module'
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser'
import { provideOAuthClient } from 'angular-oauth2-oidc'
import { FormlyPrimeNGModule } from '@ngx-formly/primeng'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      FontAwesomeModule,
      ReactiveFormsModule,
      FormlyPrimeNGModule,
      FormlyModule.forRoot({
        validationMessages: [
          { name: 'required', message: 'This field is required' },
        ],
      }),
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient(),
  ],
}).catch((err) => console.error(err))

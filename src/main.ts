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
import { AbstractControl, ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { ArrayTypeComponent } from './app/shared/form/array.component'
import { ObjectTypeComponent } from './app/shared/form/object.component'

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      FontAwesomeModule,
      ReactiveFormsModule,
      FormlyPrimeNGModule,
      FormlyModule.forRoot({
        validators: [
          {
            name: 'range',
            validation: (control: AbstractControl) => {
              return !control.value || /^[0-9]+(-[0-9]+)?$/.test(control.value)
                ? null
                : { range: true }
            },
          },
        ],
        validationMessages: [
          { name: 'required', message: 'This field is required' },
          { name: 'range', message: 'This field must be a number or a range' },
        ],
        types: [
          {
            name: 'array',
            component: ArrayTypeComponent,
          },
          {
            name: 'object',
            component: ObjectTypeComponent,
          },
        ],
      }),
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient(),
  ],
}).catch((err) => console.error(err))

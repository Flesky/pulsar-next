import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- <b>Token: </b>
    <div style="width:100vh">
    {{testDisplay}}
  </div> -->
  Redirecting...
  `
})
export class CallbackComponent {
  private accessToken: string | null = null;
  testDisplay: any = null;

  constructor(private http: HttpClient, private AppComponent: AppComponent) { }

  ngOnInit() {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      this.handleKeycloakCallback(code).subscribe(
        () => {
          console.log('Access Token:', this.accessToken);
        },
        error => {
          console.error('Error handling Keycloak callback:', error);
        }
      );
    }
    else {
      this.AppComponent.redirectToKeycloakLogin();
    }
  }

  private redirectToHome(): void {
    // Redirect to localhost:4200 after all operations are done
    window.location.href = 'http://localhost:4200';
  }

  private handleKeycloakCallback(code: string): Observable<any> {
    const keycloakBaseUrl = 'https://auth.passcess.net/auth/realms/master';
    const clientId = 'pulsar-portal';
    const clientSecret = 'your-client-secret';
    const redirectUri = 'http://localhost:4200/callback';

    const tokenUrl = `${keycloakBaseUrl}/protocol/openid-connect/token`;

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', clientId)
      .set('client_secret', clientSecret)
      .set('redirect_uri', redirectUri)
      .set('code', code);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return this.http.post(tokenUrl, body.toString(), options)
      .pipe(
        map((response: any) => {
          this.accessToken = response.access_token;
          this.testDisplay = response.access_token;

          document.cookie = `accessToken=${this.accessToken};`;

          this.redirectToHome();

          return response;
        })
      );

  }
}

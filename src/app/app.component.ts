import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from './sidebar/sidebar.component'
import { ButtonModule } from 'primeng/button'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { MenuModule } from 'primeng/menu'
import { MenuItem } from 'primeng/api'
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    ButtonModule,
    FontAwesomeModule,
    MenuModule,
  ],
  template: `
  <div class="absolute inset-0 flex h-full w-full">
      <app-sidebar />
      <div class="h-full grow overflow-y-auto bg-gray-100">
        
        <div class="sticky top-0 z-50 h-14 bg-primary">
          <div class="flex h-full w-full items-center justify-end px-4">
          <button (click)="logoutFromKeycloak()">
            Logout
          </button>
            <p-button
              (click)="menu.toggle($event)"
              styleClass="p-button-text !text-white"
            >
              {{nameHandle}}

              <div
                class="ml-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-white"
              >
                <fa-icon
                  class="text-lg text-gray-500"
                  [icon]="faUser"
                ></fa-icon>
              </div>
              <fa-icon class="ml-1 text-xs" [icon]="faCaretDown"></fa-icon>
            </p-button>
          </div>
        </div>

        <div class="p-8"><router-outlet></router-outlet></div>
      </div>
    </div>
    <p-menu #menu [model]="items" [popup]="true"></p-menu>`,
})
export class AppComponent {
  items: MenuItem[] = [
    {
      label: 'Log out',
    },
  ]

  protected readonly faUser = faUser
  protected readonly faCaretDown = faCaretDown

  nameHandle:string = "Alexander Sakker";

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  checkUserAccess() {
    if (this.getCookie('accessToken')) {
      const keycloakBaseUrl = 'https://auth.passcess.net/auth/realms/master';
      const userInfoURL = `${keycloakBaseUrl}/protocol/openid-connect/userinfo`;

      const options = {
        headers: {
          'Authorization': 'Bearer ' + this.getCookie('accessToken')
        }
      };

      this.http.post(userInfoURL, null, options)
        .subscribe(
          (response: any) => {
            console.log(response);
            this.nameHandle = response.name;
            
          },
          (error: any) => {
            console.error('Error', error);
            this.redirectToKeycloakLogin();
          }
        );
    }
    else {
      this.redirectToKeycloakLogin();
    }
  }

  redirectToKeycloakLogin(): void {
    console.log("toggled");

    const keycloakBaseUrl = 'https://auth.passcess.net/auth/realms/master';
    const clientId = 'pulsar-portal';
    const redirectUri = 'https://pulsar-portal.pages.dev/callback';

    const authUrl = `${keycloakBaseUrl}/protocol/openid-connect/auth`;

    // const state = this.generateRandomState();
    // sessionStorage.setItem('keycloak_state', state);

    const queryParams = new HttpParams()
      .set('client_id', clientId)
      .set('redirect_uri', redirectUri)
      .set('response_type', 'code')
      .set('scope', 'openid')
    // .set('state', state);

    const redirectUrl = `${authUrl}?${queryParams.toString()}`;

    // Use window.location.href to redirect the user to the Keycloak login page
    window.location.href = redirectUrl;
  }

  logoutFromKeycloak(): void {
    const keycloakBaseUrl = 'https://auth.passcess.net/auth/realms/master';
    const clientId = 'pulsar-portal';
    const redirectUri = 'https://pulsar-portal.pages.dev/callback';

    const logoutUrl = `${keycloakBaseUrl}/protocol/openid-connect/logout`;

    this.deleteCookie('accessToken');

    const queryParams = new HttpParams()
      .set('client_id', clientId)
      .set('redirect_uri', redirectUri);

    const redirectUrl = `${logoutUrl}?${queryParams.toString()}`;

    // Use window.location.href to redirect the user to the Keycloak logout endpoint
    window.location.href = redirectUrl;

  }

  getCookie(cookieName: any) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  deleteCookie(cookieName: any) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

}

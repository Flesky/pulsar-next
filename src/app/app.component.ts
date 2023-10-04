import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from './sidebar/sidebar.component'
import { ButtonModule } from 'primeng/button'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faBars, faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { MenuModule } from 'primeng/menu'
import { MenuItem } from 'primeng/api'
import { OAuthService } from 'angular-oauth2-oidc'
import { authCodeFlowConfig } from '../utils/auth'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    ButtonModule,
    FontAwesomeModule,
    MenuModule,
    NgIf,
  ],
  providers: [OAuthService],
  template: `
    <div
      *ngIf="username; else authenticating"
      class="absolute inset-0 flex h-full w-full"
    >
      <app-sidebar [isCollapsed]="isCollapsed" />
      <div class="h-full grow overflow-y-auto bg-gray-50">
        <div
          class="sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-primary px-4"
        >
          <p-button (click)="isCollapsed = !isCollapsed">
            <ng-container #icon>
              <fa-icon [icon]="faBars"></fa-icon
            ></ng-container>
          </p-button>
          <p-button
            (click)="menu.toggle($event)"
            styleClass="p-button-text !text-white"
          >
            {{ username }}

            <div
              class="ml-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-white"
            >
              <fa-icon class="text-lg text-gray-500" [icon]="faUser"></fa-icon>
            </div>
            <fa-icon class="ml-1 text-xs" [icon]="faCaretDown"></fa-icon>
          </p-button>
        </div>

        <div class="p-8">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    <p-menu #menu [model]="items" [popup]="true"></p-menu>
    <ng-template #authenticating>
      <div class="p-4">Authenticating...</div></ng-template
    >
  `,
})
export class AppComponent {
  username: string | undefined
  isCollapsed = false

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService
      .loadDiscoveryDocumentAndTryLogin({
        customHashFragment: window.location.search,
      })
      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          this.oauthService.setupAutomaticSilentRefresh()
          this.oauthService.loadUserProfile().then((profile) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore Can't override type
            this.username = profile['info']['preferred_username']
          })
        } else {
          this.oauthService.initCodeFlow()
        }
      })
  }

  items: MenuItem[] = [
    {
      label: 'Log out',
      command: () => {
        this.oauthService.logOut()
      },
    },
  ]

  protected readonly faUser = faUser
  protected readonly faCaretDown = faCaretDown
  protected readonly faBars = faBars
}

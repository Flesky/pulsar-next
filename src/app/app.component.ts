import { Component, isDevMode, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from './sidebar/sidebar.component'
import { ButtonModule } from 'primeng/button'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faBars, faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { MenuModule } from 'primeng/menu'
import { MenuItem, MessageService } from 'primeng/api'
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc'
import { authCodeFlowConfig } from '../utils/auth'
import { NgIf } from '@angular/common'
import { ToastModule } from 'primeng/toast'
import { AccountNumberService } from './core/account-number.service'

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
    ToastModule,
  ],
  providers: [OAuthService, MessageService],
  template: `
    <p-toast></p-toast>
    <div
      *ngIf="name; else authenticating"
      class="absolute inset-0 flex h-full w-full"
    >
      <div
        class="h-full w-64 shrink-0 overflow-y-auto bg-primary-dark py-2 "
        *ngIf="!isCollapsed"
      >
        <app-sidebar />
      </div>
      <div class="h-full shrink grow overflow-y-auto bg-gray-50">
        <div
          class="sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-primary px-4"
        >
          <p-button (click)="isCollapsed = !isCollapsed">
            <ng-container #icon>
              <fa-icon [icon]="faBars"></fa-icon>
            </ng-container>
          </p-button>
          <p-button
            (click)="menu.toggle($event)"
            styleClass="p-button-text flex !text-white"
          >
            {{ name }}

            <div
              class="ml-2.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white"
            >
              <fa-icon class="text-lg text-gray-500" [icon]="faUser"></fa-icon>
            </div>
            <fa-icon class="ml-1 text-xs" [icon]="faCaretDown"></fa-icon>
          </p-button>
        </div>

        <div class="md:p-8" *ngIf="pageStatus === 'Done'; else status">
          <router-outlet></router-outlet>
        </div>
        <ng-template #status>
          <div class="p-8">
            {{ pageStatus }}
          </div>
        </ng-template>
      </div>
    </div>
    <p-menu #menu [model]="items" [popup]="true"></p-menu>

    <ng-template #authenticating>
      <p class="p-4">Authenticating...</p>
    </ng-template>
  `,
})
export class AppComponent implements OnInit {
  name: string | undefined
  isCollapsed = false
  isMobile = false
  pageStatus: string | undefined

  constructor(
    private oauthService: OAuthService,
    private accountService: AccountNumberService,
  ) {}

  initAuth() {
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.events.subscribe((event) => {
      if (event instanceof OAuthErrorEvent) {
        this.oauthService.initCodeFlow()
      }
    })
    this.oauthService
      .loadDiscoveryDocumentAndTryLogin({
        customHashFragment: window.location.search,
        onTokenReceived: (info) => {
          if (isDevMode()) console.log('onTokenReceived', info)
        },
      })
      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          this.oauthService.setupAutomaticSilentRefresh()
          this.oauthService.loadUserProfile().then((profile) => {
            const { given_name, family_name, preferred_username } =
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore Can't override type
              profile['info']
            this.name =
              given_name && family_name
                ? `${given_name} ${family_name}`
                : preferred_username

            if (isDevMode()) {
              navigator.clipboard.writeText(
                'Bearer ' + this.oauthService.getAccessToken(),
              )
            }
          })
        } else {
          this.oauthService.initCodeFlow(window.location.toString())
        }
      })
  }

  ngOnInit() {
    this.initAuth()

    // Refresh page on account change
    this.accountService.accountNumber$.subscribe((value) => {
      if (value.length) {
        this.pageStatus = ''
        setTimeout(() => {
          this.pageStatus = 'Done'
        }, 0)
      } else {
        this.pageStatus = 'No account number selected'
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

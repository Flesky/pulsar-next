import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from './sidebar/sidebar.component'
import { ButtonModule } from 'primeng/button'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { MenuModule } from 'primeng/menu'
import { MenuItem } from 'primeng/api'

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
  template: `<div class="absolute inset-0 flex h-full w-full">
      <app-sidebar />
      <div class="h-full grow overflow-y-auto bg-gray-100">
        <div class="sticky top-0 z-50 h-14 bg-primary">
          <div class="flex h-full w-full items-center justify-end px-4">
            <p-button
              (click)="menu.toggle($event)"
              styleClass="p-button-text !text-white"
            >
              Alexander Sakker

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
}

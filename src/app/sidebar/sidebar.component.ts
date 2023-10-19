import { Component, Input } from '@angular/core'
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { RouterLink, RouterLinkActive } from '@angular/router'
import {
  faArrowUpRightFromSquare,
  faBell,
  faChessRook,
  faCircleArrowRight,
  faClipboardUser,
  faFileExport,
  faGlobe,
  faHome,
  faLock,
  faSatelliteDish,
  faTags,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { InputNumberModule } from 'primeng/inputnumber'
import { ButtonModule } from 'primeng/button'

type Route = {
  label: string
  icon: IconDefinition
  external?: boolean
  link: string
}
type Title = { title: string }
type Separator = { separator: true }
type MenuItem = Route | Title | Separator

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgForOf,
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive,
    NgIf,
    InputNumberModule,
    ButtonModule,
    NgClass,
  ],
  template: `
    <div
      class="h-full w-64 shrink-0 overflow-y-auto bg-primary-dark py-2 "
      *ngIf="!isCollapsed"
    >
      <img alt="Pulsar logo" class="px-4" src="../../assets/logo.png" />
      <div class="p-inputgroup p-4">
        <p-inputNumber
          placeholder="Account number"
          [useGrouping]="false"
        ></p-inputNumber>
        <button pButton class="p-button-success px-3 py-1">
          <fa-icon [icon]="faCircleArrowRight"></fa-icon>
        </button>
      </div>
      <ul class="tracking-none text-white">
        <ng-container *ngFor="let item of items; let i = index">
          <li *ngIf="isRoute(item)">
            <a
              *ngIf="!item.external"
              class="flex w-full items-center px-4 py-2 hover:bg-black/10"
              [routerLink]="item.link"
              [routerLinkActive]="'!bg-primary-darker'"
            >
              <fa-icon
                [icon]="item.icon"
                class="mr-3 block w-5 text-center"
              ></fa-icon>
              <span>{{ item.label }}</span></a
            >
            <a
              *ngIf="item.external"
              class="flex w-full items-center px-4 py-2 hover:bg-black/10"
              target="_blank"
              [href]="item.link"
            >
              <fa-icon
                [icon]="item.icon"
                class="mr-3 block w-5 text-center"
              ></fa-icon>
              <span class="mr-2">{{ item.label }}</span>

              <fa-icon
                [icon]="faArrowUpRightFromSquare"
                class="block text-center text-gray-400"
              ></fa-icon>
            </a>
          </li>
          <li class="px-4 pb-2 pt-3 font-medium" *ngIf="isTitle(item)">
            {{ item.title }}
          </li>
          <hr class="my-1.5 border-gray-200/25" *ngIf="isSeparator(item)" />
        </ng-container>
      </ul>
    </div>
  `,
})
export class SidebarComponent {
  @Input() isCollapsed = false

  items: Array<MenuItem> = [
    {
      separator: true,
    },
    {
      label: 'Dashboard',
      icon: faHome,
      link: '/dashboard',
    },
    {
      label: 'Services & Devices',
      icon: faSatelliteDish,
      link: '/services',
    },
    {
      label: 'Templates',
      icon: faFileExport,
      link: '/templates',
    },
    {
      label: 'Tags',
      icon: faTags,
      link: '/tags',
    },
    {
      separator: true,
    },
    {
      title: 'Profiles',
    },
    {
      label: 'Alerting',
      icon: faBell,
      link: '/alerting',
    },
    {
      label: 'Barring',
      icon: faLock,
      link: '/barring',
    },
    {
      label: 'Firewall',
      icon: faChessRook,
      link: '/firewall',
    },
    {
      label: 'Domain Filter',
      icon: faGlobe,
      link: '/domain-filter',
    },
    {
      separator: true,
    },
    {
      title: 'Account Management',
    },
    {
      label: 'Action Log',
      icon: faClipboardUser,
      link: '/action-log',
    },
    {
      label: 'Users',
      icon: faUsers,
      external: true,
      link: 'https://auth.passcess.net/auth/admin/master/console/#/realms/master/users',
    },
  ]

  // Type narrowing methods
  isRoute(item: MenuItem): item is Route {
    return 'link' in item
  }
  isTitle(item: MenuItem): item is Title {
    return 'title' in item
  }
  isSeparator(item: MenuItem): item is Separator {
    return 'separator' in item
  }

  protected readonly faCircleArrowRight = faCircleArrowRight
  protected readonly faArrowUpRightFromSquare = faArrowUpRightFromSquare
}

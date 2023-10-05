import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons'
import {
  faEye,
  faLock,
  faLockOpen,
  faSatelliteDish,
  faWifi,
} from '@fortawesome/free-solid-svg-icons'
import { RouterLink } from '@angular/router'
import { ChartModule } from 'primeng/chart'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { TableModule } from 'primeng/table'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FontAwesomeModule,
    RouterLink,
    ChartModule,
    ProgressSpinnerModule,
    TableModule,
  ],
  styles: [
    `
      .card {
        @apply col-span-6 rounded border bg-white px-4 py-3;
      }

      .card-header {
        @apply flex h-10 items-center justify-between;
      }

      .card-header > h2 {
        @apply text-xl font-semibold tracking-wide;
      }

      .big-icon-with-text {
        @apply flex flex-col items-center gap-2;
      }
      .big-icon-with-text > fa-icon {
        @apply text-5xl;
      }
      .big-icon-with-text > div {
        @apply text-xl;
      }
    `,
  ],
  template: `
    <h1 class="mt-4 text-center text-4xl font-semibold">SMSG Communications</h1>
    <div class="mt-10 grid grid-cols-6 gap-x-4 gap-y-4 lg:grid-cols-12">
      <div class="card">
        <div class="card-header">
          <h2>Network Status</h2>
          <button pButton class="flex items-center gap-2">
            <fa-icon class="text-lg" [icon]="faEye"></fa-icon>
            Pivotel Outages
          </button>
        </div>
        <div class="mt-6 grid grid-cols-4">
          <div *ngFor="let item of status.network" class="big-icon-with-text">
            <fa-icon
              *ngIf="item.online; else offline"
              class="text-success"
              [icon]="faCircleCheck"
            ></fa-icon>
            <ng-template #offline>
              <fa-icon class="text-danger" [icon]="faCircleXmark"></fa-icon>
            </ng-template>
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Devices</h2>
          <button
            [routerLink]="'/services'"
            pButton
            class="flex items-center gap-2"
          >
            <fa-icon class="text-lg" [icon]="faSatelliteDish"></fa-icon>
            View all
          </button>
        </div>
        <div class="mt-6 grid grid-cols-4">
          <div class="big-icon-with-text">
            <fa-icon class="text-success" [icon]="faWifi"></fa-icon>
            <div class="text-xl">{{ status.devices.online }}</div>
          </div>
          <div class="big-icon-with-text">
            <fa-icon class="text-danger" [icon]="faWifi"></fa-icon>
            <div class="text-xl">{{ status.devices.offline }}</div>
          </div>
          <div class="big-icon-with-text">
            <fa-icon class="text-success" [icon]="faLockOpen"></fa-icon>
            <div class="text-xl">{{ status.devices.unbarred }}</div>
          </div>
          <div class="big-icon-with-text">
            <fa-icon class="text-danger" [icon]="faLock"></fa-icon>
            <div class="text-xl">{{ status.devices.barred }}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Chart 1</h2>
        </div>
        <div>
          <p-chart
            type="line"
            [data]="lineData"
            [options]="lineOptions"
          ></p-chart>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Chart 2</h2>
        </div>
        <div>
          <p-chart
            type="doughnut"
            [data]="pieData"
            [options]="pieOptions"
          ></p-chart>
        </div>
      </div>

      <div class="card !col-span-full">
        <div class="card-header">
          <h2>Device History</h2>
        </div>
        <p-table
          styleClass="mt-2"
          [paginator]="true"
          [showJumpToPageDropdown]="true"
          [showPageLinks]="false"
          [rows]="10"
          [value]="tableData"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Timestamp</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-row>
            <tr>
              <td>{{ row.id }}</td>
              <td>{{ row.description }}</td>
              <td>{{ row.timestamp }}</td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  status = {
    network: [
      {
        name: 'Pivotel',
        online: true,
      },
      {
        name: 'Inmarsat',
        online: true,
      },
      {
        name: 'Iridium',
        online: true,
      },
      {
        name: 'Thuraya',
        online: false,
      },
    ],
    devices: {
      online: 2,
      offline: 576,
      unbarred: 576,
      barred: 2,
    },
  }
  pieData: any
  pieOptions: any
  lineData: any
  lineOptions: any
  tableData: any

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary',
    )
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

    this.pieData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    }

    this.lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4,
        },
      ],
    }

    this.pieOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    }

    this.lineOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    }

    this.tableData = [...Array(50)].map((_, i) => {
      const id = Math.floor(Math.random() * 92392823)
      return {
        id,
        description: ['Data barred', 'Disconnected', 'Connected'][id % 3],
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 25000) - i * 50000,
        ).toLocaleString(),
      }
    })
  }

  protected readonly faCircleCheck = faCircleCheck
  protected readonly Object = Object
  protected readonly faCircleXmark = faCircleXmark
  protected readonly faEye = faEye
  protected readonly faLock = faLock
  protected readonly faLockOpen = faLockOpen
  protected readonly faWifi = faWifi
  protected readonly faSatelliteDish = faSatelliteDish
}

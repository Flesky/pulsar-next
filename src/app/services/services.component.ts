import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import { ApiService } from '../../api/api.service'
import { Service } from '../../api/api.types'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faLock, faLockOpen, faWifi } from '@fortawesome/free-solid-svg-icons'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TableModule, FontAwesomeModule, ButtonModule],
  providers: [ApiService],
  template: `<p-table
    [value]="data"
    [loading]="loading"
    [lazy]="true"
    (onLazyLoad)="get($event)"
    [paginator]="true"
    [rows]="10"
    [rowsPerPageOptions]="[10, 20, 50, 100]"
    [totalRecords]="totalRecords"
  >
    <ng-template pTemplate="caption">
      <div class="flex justify-between">
        <p-columnFilter
          type="text"
          field="search"
          [showMenu]="false"
          placeholder="Filter services"
        ></p-columnFilter>
      </div>
    </ng-template>
    <ng-template pTemplate="header">
      <tr>
        <th>Name</th>
        <th>Vessel</th>
        <th>Type</th>
        <th>MSISDN</th>
        <th>ICCID</th>
        <th>Status</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-row>
      <tr>
        <td>{{ row.name }}</td>
        <td>{{ row.vessel }}</td>
        <td>{{ row.type }}</td>
        <td>{{ row.MSISDN }}</td>
        <td>{{ row.ICCID }}</td>
        <td>
          <div class="flex gap-4 text-xl">
            <fa-icon
              [icon]="faWifi"
              [class]="row.status.unbarred ? 'text-success' : 'text-danger'"
            ></fa-icon>
            <fa-icon
              [icon]="row.status.online ? faLockOpen : faLock"
              class=""
              [class]="row.status.online ? 'text-success' : 'text-danger'"
            ></fa-icon>
          </div>
        </td>
      </tr>
    </ng-template>
  </p-table>`,
})
export class ServicesComponent {
  data: Service[] = []
  totalRecords = 0
  loading = true
  constructor(private api: ApiService) {}

  get(state: TableLazyLoadEvent) {
    this.loading = true
    this.api.getServices(state).subscribe((data) => {
      this.data = data.data
      this.totalRecords = data.pagination.total
      this.loading = false
    })
  }

  protected readonly faLock = faLock
  protected readonly faLockOpen = faLockOpen
  protected readonly faWifi = faWifi
}

import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import { MockService } from '../../api/mock.service'
import { Service } from '../../api/mock.types'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faLock, faLockOpen, faWifi } from '@fortawesome/free-solid-svg-icons'
import { ButtonModule } from 'primeng/button'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ServiceComponent } from './service.component'
import { DynamicDialogDefaults } from '../../utils/defaults'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FontAwesomeModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  providers: [MockService, DialogService],
  template: `<p-table
    [value]="data"
    [loading]="loading"
    [lazy]="true"
    (onLazyLoad)="get($event)"
    [paginator]="true"
    [showJumpToPageDropdown]="true"
    [rowsPerPageOptions]="[10, 20, 50, 100]"
    [showPageLinks]="false"
    [rows]="10"
    [rowHover]="true"
    [showLoader]="false"
    [totalRecords]="totalRecords"
  >
    <ng-template pTemplate="caption">
      <div class="flex items-center justify-between">
        <p-columnFilter
          type="text"
          field="search"
          [showMenu]="false"
          placeholder="Filter services"
        ></p-columnFilter>
        <p-progressSpinner
          class="h-8 w-8"
          styleClass="!h-8 !w-8"
          strokeWidth="6"
          *ngIf="loading"
        ></p-progressSpinner>
      </div>
    </ng-template>
    <ng-template pTemplate="header">
      <tr>
        <th pSortableColumn="name">
          Name<p-sortIcon field="name"></p-sortIcon>
        </th>
        <th pSortableColumn="vessel">
          Vessel<p-sortIcon field="vessel"></p-sortIcon>
        </th>
        <th pSortableColumn="type">
          Type<p-sortIcon field="type"></p-sortIcon>
        </th>
        <th pSortableColumn="MSISDN">
          MSISDN<p-sortIcon field="MSISDN"></p-sortIcon>
        </th>
        <th pSortableColumn="ICCID">
          ICCID<p-sortIcon field="ICCID"></p-sortIcon>
        </th>
        <th>Status</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-row>
      <tr (click)="select(row)" class="cursor-pointer">
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

  dialog: DynamicDialogRef | undefined
  constructor(
    private api: MockService,
    private dialogService: DialogService,
  ) {}

  get(state: TableLazyLoadEvent) {
    this.loading = true
    this.api.getServices(state).subscribe((data) => {
      this.data = data.data
      this.totalRecords = data.pagination.total
      this.loading = false
    })
  }

  select(row: Service) {
    this.dialog = this.dialogService.open(ServiceComponent, {
      data: {
        id: row.id,
      },
      header: `${row.vessel} (ID: ${row.id})`,
      ...DynamicDialogDefaults,
    })
  }

  protected readonly faLock = faLock
  protected readonly faLockOpen = faLockOpen
  protected readonly faWifi = faWifi
}

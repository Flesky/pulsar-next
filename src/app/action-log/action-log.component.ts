import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ButtonModule } from 'primeng/button'
import { TableLazyLoadEvent } from 'primeng/table'
import { Activity } from '../../api/api.model'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ApiService } from '../../api/api.service'
import { ConfirmationService } from 'primeng/api'
import { TableComponent } from '../shared/table/table.component'

@Component({
  selector: 'app-action-log',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressSpinnerModule, TableComponent],
  providers: [ApiService, DialogService, ConfirmationService],
  template: `<app-table
    [loading]="loading"
    [data]="data"
    [columns]="[
      { name: 'User', sortKey: 'userID' },
      { name: 'Operation', sortKey: 'operation' },
      { name: 'Timestamp', sortKey: 'created_at' }
    ]"
    [totalRecords]="totalRecords"
    (get)="get($event)"
  >
    <ng-template #body let-row>
      <tr>
        <td>{{ row.userID }}</td>
        <td>{{ row.operation }}</td>
        <td>{{ row.created_at | date: 'yyyy/M/d h:m a' }}</td>
      </tr>
    </ng-template>
  </app-table> `,
})
export class ActionLogComponent {
  lastState: TableLazyLoadEvent | undefined
  data: Activity[] = []
  totalRecords = 0
  loading = true
  dialog: DynamicDialogRef | undefined

  constructor(private apiService: ApiService) {}

  get(state: TableLazyLoadEvent | undefined = undefined) {
    if (state) this.lastState = state
    state ||= this.lastState
    this.loading = true
    this.apiService.getActionLog(state!).subscribe((res) => {
      const { Activities, Summary } = res
      const { filteredCount } = Summary
      this.data = Activities
      this.totalRecords = filteredCount
      this.loading = false
    })
  }

  protected readonly Date = Date
}

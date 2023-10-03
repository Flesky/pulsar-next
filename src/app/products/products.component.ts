import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import { MockService } from '../../api/mock.service'
import { Product } from '../../api/mock.types'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { PaginatorModule } from 'primeng/paginator'
import { ProductComponent } from './product.component'
import { DynamicDialogDefaults } from '../../utils/defaults'
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ProgressSpinnerModule,
    InputTextModule,
    ButtonModule,
    PaginatorModule,
  ],
  providers: [MockService, DialogService],
  template: `
    <div>
      This is a test page to compose functionality before copying it into other
      elements.
    </div>
    <div class="mb-4 flex justify-between"></div>

    <p-table
      [lazy]="true"
      [value]="data"
      dataKey="id"
      (onLazyLoad)="getData($event)"
      [paginator]="true"
      [rows]="10"
      [rowsPerPageOptions]="[10, 20, 50, 100]"
      [totalRecords]="totalRecords"
      [loading]="loading"
      [showCurrentPageReport]="true"
    >
      <ng-template pTemplate="caption">
        <div class="flex justify-between">
          <p-columnFilter
            type="text"
            field="search"
            [showMenu]="false"
            placeholder="Filter products"
          ></p-columnFilter>
          <button pButton class="p-success">New product</button>
        </div>
      </ng-template>
      <ng-template pTemplate="header">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Brand</th>
          <th>Category</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-row>
        <tr (click)="select(row)">
          <td>{{ row.id }}</td>
          <td>{{ row.title }}</td>
          <td>{{ row.price }}</td>
          <td>{{ row.brand }}</td>
          <td>{{ row.category }}</td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class ProductsComponent {
  data: Product[] = []
  totalRecords = 0
  loading = true

  dialog: DynamicDialogRef | undefined

  constructor(
    private api: MockService,
    private dialogService: DialogService,
    private App:AppComponent
  ) {}

  ngOnInit(){
    this.App.checkUserAccess();
  }

  getData(state: TableLazyLoadEvent) {
    this.loading = true
    this.api.getProducts(state).subscribe((res) => {
      this.data = res.products
      this.totalRecords = res.total
      this.loading = false
    })
  }

  select(product: Product) {
    this.dialog = this.dialogService.open(ProductComponent, {
      data: {
        id: product.id,
      },
      header: product.title,
      ...DynamicDialogDefaults,
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../api/api.service';
import { Product } from '../../api/api.types';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectedProductComponent } from './selected-product.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TableModule, ProgressSpinnerModule],
  providers: [ApiService, DialogService],
  template: ` <div>
      This is a test page to compose functionality before copying it into other
      elements.
    </div>
    <p-table
      [loading]="loading"
      [value]="data"
      stateStorage="session"
      stateKey="table-test"
    >
      <ng-template pTemplate="header">
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-product>
        <tr (click)="select(product)">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
        </tr>
      </ng-template>
    </p-table>`,
})
export class ProductsComponent implements OnInit {
  data: Product[] = [];
  loading = true;

  ref: DynamicDialogRef | undefined;

  constructor(
    private api: ApiService,
    private dialogService: DialogService,
  ) {}

  getData() {
    this.api.getProducts().subscribe((res) => {
      console.log(res.products);
      this.data = res.products;
      this.loading = false;
    });
  }

  select(product: Product) {
    this.ref = this.dialogService.open(SelectedProductComponent, {
      data: {
        id: product.id,
      },
      header: product.title,
      width: '600px',
      dismissableMask: true,
    });
  }

  ngOnInit() {
    this.getData();
  }

  protected readonly console = console;
}

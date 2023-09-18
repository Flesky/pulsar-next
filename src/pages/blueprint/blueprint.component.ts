import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../api/api.service';
import { Products } from '../../api/api.types';

@Component({
  selector: 'app-blueprint',
  standalone: true,
  imports: [CommonModule, TableModule],
  providers: [ApiService],
  template: ` <div>
      This is a test page to compose functionality before copying it into other
      elements.
    </div>
    <p-table
      [value]="data"
      [loading]="loading"
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
        <tr>
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
        </tr>
      </ng-template>
    </p-table>`,
})
export class BlueprintComponent implements OnInit {
  data: Products[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  getData() {
    this.api.getProducts().subscribe((res) => {
      console.log(res.products);
      this.data = res.products;
      this.loading = false;
    });
  }

  ngOnInit() {
    this.getData();
  }
}

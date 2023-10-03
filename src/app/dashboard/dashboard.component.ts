import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardModule } from 'primeng/card'
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: ``,
})
export class DashboardComponent {

  constructor(private AppComponent: AppComponent) { }
  
  ngOnInit(){
    this.AppComponent.checkUserAccess();
  }

}

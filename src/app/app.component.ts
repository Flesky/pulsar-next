import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  template: `<div class="absolute inset-0 flex h-full w-full">
    <app-sidebar />
    <div class="h-full grow overflow-y-auto p-8">
      <router-outlet></router-outlet>
    </div>
  </div> `,
})
export class AppComponent {
  title = 'pulsar-next';
}

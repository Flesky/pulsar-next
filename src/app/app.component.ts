import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div class="absolute inset-0 flex h-full w-full">
    <app-sidebar />
    <div class="h-full grow overflow-y-auto p-4">
      <router-outlet></router-outlet>
    </div>
  </div> `,
})
export class AppComponent {
  title = 'pulsar-next';
}

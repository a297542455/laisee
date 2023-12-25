import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'sent-laisee', url: '/sent-laisee', icon: 'accessibility' },
    { title: 'capacitor', url: '/capacitor', icon: 'camera' },
    { title: 'recording', url: '/recording', icon: 'recording' },
  ];
  constructor() {}
}

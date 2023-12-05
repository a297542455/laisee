import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'sent-laisee', url: '/sent-laisee', icon: 'mail' },
    { title: 'folder/demo', url: '/folder/demo', icon: 'mail' },
  ];
  constructor() {}
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
}

import { Component } from '@angular/core';
import { FrontendFormComponent } from './frontend-form/frontend-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FrontendFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}

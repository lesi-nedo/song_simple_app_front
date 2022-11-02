import { LoggingLevel } from './config.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'songs-app';

  onClick(parameter: HTMLElement, others: HTMLElement[]){
    others.forEach(elem => elem.style.color="black");
    parameter.style.color="blue";
  }
}

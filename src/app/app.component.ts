import { LoggingLevel } from './config.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'songs-app';

  some() {
    const logProp = Object.getOwnPropertyNames(LoggingLevel);
    logProp.forEach(x => console.log(x.match(/^[A-Z].+/g)));
  }
}

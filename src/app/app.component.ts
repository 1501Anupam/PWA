import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PWA';
  promptEvent: any;
  joke: any;
  // updateAvailable: boolean = false;

  constructor(private update: SwUpdate, private data: DataService) {
    update.available.subscribe(event => {
      update.activateUpdate().then(() => window.location.reload());
    });
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
    }

  ngOnInit() {
    this.data.jokeOfTheDay().subscribe(res => {
      this.joke = res;
    });
  }

  installPwa() {
    this.promptEvent.prompt();
  }
}

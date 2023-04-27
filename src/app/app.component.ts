import { Component, OnInit } from '@angular/core';
import { fromEvent, map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'aow-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  #worker = new Worker(new URL('./demo.worker', import.meta.url));

  ngOnInit(): void {
    fromEvent<MessageEvent>(this.#worker, 'message')
      .pipe(map(event => event.data))
      .subscribe(console.log)
  }

  runWorker() {
    this.#worker.postMessage('test');
  }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Remote, wrap } from "comlink";
import { Observable } from 'rxjs';
import { DemoWorker } from './demo.worker';
import './observable-worker/transfer-handlers';

@Component({
  standalone: true,
  selector: 'aow-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  #instance!: Remote<DemoWorker>;

  protected counter!: Observable<number>;

  async ngOnInit() {
    const worker = wrap<typeof DemoWorker>(new Worker(new URL('./demo.worker', import.meta.url)));
    this.#instance = await new worker();
    this.counter = await this.#instance.counter;
  }

  increment() {
    this.#instance.increment();
  }

  decrement() {
    this.#instance.decrement();
  }
}
  
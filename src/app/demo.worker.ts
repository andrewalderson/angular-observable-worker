/// <reference lib="webworker" />

import { fromEvent } from "rxjs";

export class DemoWorker {
  
  #message$ = fromEvent<MessageEvent>(self, 'message');

  constructor() {
    this.#message$.subscribe(event => {
      const response = `worker response to ${event.data}`;
      postMessage(response);
    })
  }
}

new DemoWorker();



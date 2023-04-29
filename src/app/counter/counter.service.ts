import { Injectable } from '@angular/core';
import { Remote, wrap } from 'comlink';
import { Observable } from 'rxjs';
import { CounterWorker } from './counter.worker';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  #instance?: Remote<CounterWorker>;

  #counter?: Observable<number>;

  constructor() { 
    this.init();
  }

  async init() {
    const counterWorker = wrap<typeof CounterWorker>(new Worker(new URL('./counter.worker', import.meta.url)));
    this.#instance = await new counterWorker();
  }

  get counter() {
    // because creating the worker is an intensive operation
    // this will return undefined until the instance is created
    // and we can resolve the Promise wrapping the workers 'counter'
    // It means that components using this can't use OnPush change detection
    // but that may not proabably not be an issue when the Signals API is available in v16
    if(!this.#counter) {
      this.#instance?.counter.then((value) => {
        this.#counter = value;
      })
    }
    return this.#counter;
  }

  increment() {
    this.#instance?.increment();
  }

  decrement() {
    this.#instance?.decrement();
  }
  
}

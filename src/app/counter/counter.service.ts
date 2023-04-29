import { Injectable } from '@angular/core';
import { Remote, wrap } from 'comlink';
import { Observable } from 'rxjs';
import { CounterWorker } from './counter.worker';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  #instance!: Remote<CounterWorker>;

  #counter!: Observable<number>;
  
  constructor() { 
    this.init();
  }

  async init() {
    const worker = wrap<typeof CounterWorker>(new Worker(new URL('./counter.worker', import.meta.url)));
    this.#instance = await new worker();
    
    this.#counter = await this.#instance.counter; 
  }

  get counter() {
    return this.#counter;
  }

  increment() {
    this.#instance.increment();
  }

  decrement() {
    this.#instance.decrement();
  }
  
}

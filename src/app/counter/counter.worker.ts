import { BehaviorSubject } from "rxjs";
import { ObservableWorker } from "../observable-worker/observable-worker.decorator";

@ObservableWorker()
export class CounterWorker {
    
    get counter() {
        return this.#counterObservable;
    }
    #counter = new BehaviorSubject<number>(0);
    #counterObservable = this.#counter.asObservable();

    increment() {
        this.#counter.next(this.#counter.value + 1)
    }

    decrement() {
        this.#counter.next(this.#counter.value - 1)
    }
}


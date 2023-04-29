import { BehaviorSubject } from "rxjs";
import { ObservableWorker } from "../observable-worker/observable-worker.decorator";

@ObservableWorker()
export class DemoWorker {
    
    get counter() {
        return this.#counter;
    }
    #counter = new BehaviorSubject<number>(0);

    increment() {
        this.#counter.next(this.#counter.value + 1)
    }

    decrement() {
        this.#counter.next(this.#counter.value - 1)
    }
}


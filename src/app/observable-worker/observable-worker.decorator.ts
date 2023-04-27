import { fromEvent } from "rxjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = { new (...args: any[]): any };

export function ObservableWorker<T extends Constructor>() {
    return (constructor: T) => {
        new constructor();

        const incomingMessage$ = fromEvent<MessageEvent>(self, 'message');

        incomingMessage$.subscribe(event => {
            const response = `worker response to ${event.data}`;
            postMessage(response);
          })
    }
}
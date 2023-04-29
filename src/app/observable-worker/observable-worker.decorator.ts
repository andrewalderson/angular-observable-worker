import { expose } from "comlink";
import './transfer-handlers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = { new (...args: any[]): any };

/**
 * Decorator that exposes a worker that uses Observables as a ComLink remote.
 * The transfer handlers for the Observable type are imported at the top
 */
export function ObservableWorker<T extends Constructor>() {
    return (constructor: T) => {
        expose(constructor);
    }
} 
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Remote, proxy, releaseProxy, transferHandlers } from "comlink";
import { Observable, Observer, Subscribable, Subscription } from "rxjs";

/**
 * ComLink transfer handlers for Observables
 */
transferHandlers.set('observable', {
    canHandle: (value: unknown): value is Observable<unknown> => {
      return value instanceof Observable;
    },
    deserialize: (value: MessagePort) => {
      return new Observable<unknown>((observer) => {
        const remote = transferHandlers.get('proxy')!
          .deserialize(value) as Remote<Subscribable<unknown>>;
  
        void remote.subscribe(proxy({
          next: (next: unknown) => observer.next(next),
          error: (error: unknown) => observer.error(error),
          complete: () => observer.complete()
        })).then((subscription) => observer.add(() => {
          subscription.unsubscribe();
          remote[releaseProxy]();
        }));
      });
    },
    serialize: (value: Observable<unknown>) => {
      return transferHandlers.get('proxy')!.serialize({
        subscribe: (observer: Remote<Observer<unknown>>) => value.subscribe({
          next: (next: unknown) => void observer.next(next).then(),
          error: (error: unknown) => void observer.error(error).then(),
          complete: () => void observer.complete().then()
        })
      });
    }
  });
  
  transferHandlers.set('subscription', {
    canHandle: (value: unknown): value is Subscription => {
      return value instanceof Subscription;
    },
    deserialize: (value: MessagePort) => {
      return new Subscription(() => {
        const remote = transferHandlers.get('proxy')!
          .deserialize(value) as Remote<Subscription>;
  
        void remote.unsubscribe().then(() => {
          remote[releaseProxy]();
        });
      });
    },
    serialize: (value: Subscription) => {
      return transferHandlers.get('proxy')!.serialize({
        unsubscribe: () => value.unsubscribe()
      });
    }
  });
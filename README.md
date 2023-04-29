# Angular Observable Worker

A simple prototype for accessing Observables in a web worker. It uses a library called [ComLink](https://github.com/GoogleChromeLabs/comlink) and this project adds custom transfer handlers for serializing and deserializing Observables and Subscriptions
when calling postMessage.

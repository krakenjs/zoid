
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

export function denodeify(method) {

    return function() {

        let self = this;
        let args = Array.prototype.slice.call(arguments);

        if (args.length >= method.length) {
            return Promise.resolve(method.apply(self, args));
        }

        return new Promise((resolve, reject) => {
            args.push(function denodeifyCallback(err, result) {
                return err ? reject(err) : resolve(result);
            });
            return method.apply(self, args);
        });
    };
}
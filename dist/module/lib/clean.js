import { ZalgoPromise } from 'zalgo-promise/src';
import { noop } from 'belter/src';

export function cleanup(obj) {

    var tasks = [];
    var cleaned = false;

    return {
        set: function set(name, item) {

            if (cleaned) {
                return item;
            }

            obj[name] = item;
            this.register(function () {
                delete obj[name];
            });
            return item;
        },
        register: function register(name, method) {

            if (typeof name === 'function') {
                method = name;
                name = '<anonymous-cleanup-handler>';
            }

            if (typeof method !== 'function') {
                throw new TypeError('Expected to be passed function to clean.register');
            }

            if (cleaned) {
                method();
                return;
            }

            tasks.push({
                complete: false,

                name: name,

                run: function run() {

                    if (this.complete) {
                        return;
                    }

                    this.complete = true;

                    if (method) {
                        method();
                    }
                }
            });
        },
        hasTasks: function hasTasks() {
            return Boolean(tasks.filter(function (item) {
                return !item.complete;
            }).length);
        },
        all: function all() {
            var results = [];

            cleaned = true;

            while (tasks.length) {
                results.push(tasks.pop().run());
            }

            return ZalgoPromise.all(results).then(function () {/* pass */});
        },
        run: function run(name) {
            var results = [];

            for (var _i2 = 0, _length2 = tasks == null ? 0 : tasks.length; _i2 < _length2; _i2++) {
                var item = tasks[_i2];
                if (item.name === name) {
                    results.push(item.run());
                }
            }

            return ZalgoPromise.all(results).then(noop);
        }
    };
}
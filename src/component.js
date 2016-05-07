
import { ChildComponent } from './child';
import { ParentComponent } from './parent';

import * as drivers from './drivers';

export class Component {

    constructor(options) {
        this.options = options || {};
        this.validate();

        for (let driverName of Object.keys(drivers)) {
            let driver = drivers[driverName];
            driver.register(this);
        }
    }

    validate() {
        // pass
    }

    attach(options) {
        return new ChildComponent(this, options);
    }

    init(options) {
        return new ParentComponent(this, options);
    }
}
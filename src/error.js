/* @flow */

export function PopupOpenError(message : string) {
    this.message = message;
}

PopupOpenError.prototype = Object.create(Error.prototype);

export function IntegrationError(message : string) {
    this.message = message;
}

IntegrationError.prototype = Object.create(Error.prototype);

export function RenderError(message : string) {
    this.message = message;
}

RenderError.prototype = Object.create(Error.prototype);

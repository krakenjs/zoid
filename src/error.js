
export function PopupOpenError(message) {
    this.message = message;
}

PopupOpenError.prototype = Object.create(Error.prototype);

export function IntegrationError(message) {
    this.message = message;
}

IntegrationError.prototype = Object.create(Error.prototype);
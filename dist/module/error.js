export function IntegrationError(message) {
    this.message = message;
}

IntegrationError.prototype = Object.create(Error.prototype);

export function RenderError(message) {
    this.message = message;
}

RenderError.prototype = Object.create(Error.prototype);
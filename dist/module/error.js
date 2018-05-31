"use strict";

exports.__esModule = true;
exports.PopupOpenError = PopupOpenError;
exports.IntegrationError = IntegrationError;
exports.RenderError = RenderError;
function PopupOpenError(message) {
    this.message = message;
}

PopupOpenError.prototype = Object.create(Error.prototype);

function IntegrationError(message) {
    this.message = message;
}

IntegrationError.prototype = Object.create(Error.prototype);

function RenderError(message) {
    this.message = message;
}

RenderError.prototype = Object.create(Error.prototype);
/// <reference path="../IContainer.ts" />
"use strict";
var FactoryParameter = (function () {
    function FactoryParameter(paramServices, service, scopeName) {
        this.paramServices = paramServices;
        this.service = service;
        this.scopeName = scopeName;
    }
    FactoryParameter.prototype.resolve = function (container) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length !== _this.paramServices.length) {
                throw new Error('Incorrect number of arguments passed to factory.');
            }
            var child = container.createChild(_this.scopeName);
            args.forEach(function (arg, i) {
                var paramService = _this.paramServices[i];
                child.register(paramService).providedInstance(arg);
            });
            return child.resolve(_this.service);
        };
    };
    return FactoryParameter;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FactoryParameter;

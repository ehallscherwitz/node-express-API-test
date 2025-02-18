'use strict';
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
            d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const controller_1 = require('../decorators/controller');
const route_1 = require('../decorators/route');
const joi_1 = __importDefault(require('joi'));
const validate_1 = require('../decorators/validate');
const postHealthCHeckValidation = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email()
});
let MainController = class MainController {
    getHealthCheck(req, res, next) {
        logging.info('Healthcheck called successfully!');
        res.status(200).send('Success');
    }
    postHealthCheck(req, res, next) {
        logging.info('Healthcheck called successfully!');
        res.status(200).send(Object.assign({}, req.body));
    }
};
__decorate([(0, route_1.Route)('get', '/healthcheck')], MainController.prototype, 'getHealthCheck', null);
__decorate(
    [(0, route_1.Route)('post', '/healthcheck'), (0, validate_1.Validate)(postHealthCHeckValidation)],
    MainController.prototype,
    'postHealthCheck',
    null
);
MainController = __decorate([(0, controller_1.Controller)()], MainController);
exports.default = MainController;

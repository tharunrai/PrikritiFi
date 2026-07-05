"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CirclesController = void 0;
const common_1 = require("@nestjs/common");
const circles_service_1 = require("./circles.service");
let CirclesController = class CirclesController {
    constructor(circlesService) {
        this.circlesService = circlesService;
    }
    myCircles() { return this.circlesService.myCircles(); }
    verify() { return this.circlesService.verify(); }
};
exports.CirclesController = CirclesController;
__decorate([
    (0, common_1.Get)('my'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CirclesController.prototype, "myCircles", null);
__decorate([
    (0, common_1.Post)('verify'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CirclesController.prototype, "verify", null);
exports.CirclesController = CirclesController = __decorate([
    (0, common_1.Controller)('circles'),
    __metadata("design:paramtypes", [circles_service_1.CirclesService])
], CirclesController);
//# sourceMappingURL=circles.controller.js.map
"use strict";
exports.__esModule = true;
/**
 * 坦克状态，停止或跑
 */
var state;
(function (state) {
    state[state["stop"] = 0] = "stop";
    state[state["run"] = 1] = "run";
    state[state["defend"] = 2] = "defend";
    state[state["shoot"] = 3] = "shoot";
})(state || (state = {}));
var utils_1 = require("./utils");
var Shoot_1 = require("./Shoot");
var Tank = /** @class */ (function () {
    function Tank(name) {
        this.life = 10;
        this.width = 20;
        this.height = 20;
        this.x = 0;
        this.y = 0;
        // 步长
        this.step = 1;
        // 状态
        this.state = state.stop;
        this.runOrg = 90;
        this.defend = false;
        // 子弹cd 1s
        this.shootCD = 0;
        this.shootMap = [];
        this.name = name;
    }
    Tank.prototype.create = function (x, y) {
        console.log("\u521B\u5EFA" + this.name);
        this.x = x;
        this.y = y;
    };
    Tank.prototype.beHurt = function () {
        this.life -= 1;
        if (this.life <= 0) {
            this.kill();
        }
    };
    Tank.prototype.kill = function () {
        console.log(this.name + "\u88AB\u6740\u6B7B");
    };
    Tank.prototype.toDefend = function () {
        var _this = this;
        console.log('守卫');
        this.state = state.defend;
        setTimeout(function () {
            _this.state = state.stop;
        }, 1000);
    };
    Tank.prototype.move = function () {
        var _a = utils_1.calMove(this.runOrg), x = _a.x, y = _a.y;
        this.x = Math.round((this.x + Math.round(x)) * 100) / 100;
        this.y = Math.round((this.y + Math.round(y)) * 100) / 100;
    };
    /**
     *
     * @param org 射击方向
     */
    Tank.prototype.shoot = function (org) {
        var _this = this;
        // 可以射击
        if (this.shootCD === 0) {
            this.shootCD = 1;
            var shoot = new Shoot_1["default"](this.x, this.y, org, this.name);
            this.shootMap.push(shoot);
            var id_1 = setTimeout(function () {
                _this.shootCD = 0;
                clearTimeout(id_1);
            }, 3000);
            return;
        }
        console.log('未冷却');
    };
    Tank.prototype.update = function () {
        if (this.state === state.stop) {
            return;
        }
        this.move();
    };
    /**
     * 载入蔡徐坤 ctrl
     * 会把当前坦克的所有信息传过去
     * @param code
     */
    Tank.prototype.loadCtrl = function (code) {
        var runGame = eval(code);
        runGame(this);
    };
    return Tank;
}());
exports["default"] = Tank;

"use strict";
exports.__esModule = true;
/**
 * 子弹状态，停止或跑
 */
var state;
(function (state) {
    state[state["stop"] = 0] = "stop";
    state[state["run"] = 1] = "run";
    state[state["defend"] = 2] = "defend";
    state[state["shoot"] = 3] = "shoot";
})(state || (state = {}));
var utils_1 = require("./utils");
var Shoot = /** @class */ (function () {
    function Shoot(x, y, org, name) {
        this.life = 1;
        this.width = 5;
        this.height = 5;
        this.x = 0;
        this.y = 0;
        // 步长
        this.step = 1;
        // 状态
        this.state = state.stop;
        this.runOrg = 90;
        this.defend = false;
        this.x = x;
        this.y = y;
        this.runOrg = org;
        this.name = name;
    }
    Shoot.prototype.create = function () {
        console.log("\u521B\u5EFA\u5B50\u5F39");
    };
    Shoot.prototype.beHurt = function () {
        this.life -= 1;
        if (this.life <= 0) {
            this.kill();
        }
    };
    Shoot.prototype.kill = function () {
        console.log('子弹销毁');
        this.life = 0;
    };
    Shoot.prototype.move = function () {
        var _a = utils_1.calMove(this.runOrg, this.step), x = _a.x, y = _a.y;
        this.x = Math.round((this.x + Math.round(x)) * 1000) / 1000;
        this.y = Math.round((this.y + Math.round(y)) * 1000) / 1000;
        console.log(this.x, this.y);
    };
    /**
     *
     * @param org 射击方向
     */
    Shoot.prototype.shoot = function (org) {
        this.shootOrg = org;
    };
    Shoot.prototype.update = function () {
        if (this.life <= 0) {
            return;
        }
        this.move();
    };
    /**
     * 载入蔡徐坤 ctrl
     * 会把当前坦克的所有信息传过去
     * @param code
     */
    Shoot.prototype.loadCtrl = function (code) {
        var runGame = eval(code);
        runGame(this);
    };
    return Shoot;
}());
exports["default"] = Shoot;

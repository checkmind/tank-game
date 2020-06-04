"use strict";
exports.__esModule = true;
var tank_1 = require("./tank");
var state;
(function (state) {
    state[state["stop"] = 0] = "stop";
    state[state["run"] = 1] = "run";
})(state || (state = {}));
var code = "(function runGame(tank) {\n  console.log(tank)\n  setTimeout(() => {\n    tank.state = state.run\n  }, 1000)\n  setTimeout(() => {\n    tank.state = state.run\n    tank.shoot(90)\n  }, 3000)\n  setTimeout(() => {\n    tank.state = state.stop\n  }, 4000)\n})";
var code2 = "(function runGame(tank) {\n  \n})";
var utils_1 = require("./utils");
var GameMap = /** @class */ (function () {
    function GameMap() {
        this.width = 500;
        this.height = 500;
        this.heros = [];
        this.createTank();
        this.worldTime();
    }
    GameMap.prototype.createTank = function () {
        var tank = new tank_1["default"]('cxk');
        tank.loadCtrl(code);
        tank.create(0, 0);
        this.heros.push(tank);
        var badTank = new tank_1["default"]('badTank');
        badTank.loadCtrl(code2);
        badTank.create(200, 0);
        this.heros.push(badTank);
    };
    GameMap.prototype.worldTime = function () {
        var _this = this;
        setTimeout(function () {
            _this.worldTime();
        }, 60);
        this.update();
    };
    GameMap.prototype.update = function () {
        var _this = this;
        this.heros.map(function (tank) {
            tank.update();
            tank.shootMap = tank.shootMap.filter(function (shoot) {
                shoot.update();
                if (shoot.x < 0 || shoot.y < 0 || shoot.x > _this.width || shoot.y > _this.height) {
                    shoot.kill();
                    return false;
                }
                return true;
            });
        });
        this.checkHits();
    };
    GameMap.prototype.checkHits = function () {
        var _this = this;
        this.heros.map(function (tank) {
            _this.heros.map(function (others) {
                others.shootMap = tank.shootMap.filter(function (shoot) {
                    shoot.update();
                    if (utils_1.checkHit(tank, shoot) && tank.name !== shoot.name) {
                        shoot.kill();
                        tank.beHurt();
                        console.warn('射中了');
                        return false;
                    }
                    return true;
                });
            });
        });
    };
    return GameMap;
}());
exports["default"] = GameMap;
// (function runGame(tank: Tank) {
//   console.log(tank)
//   setTimeout(() => {
//     tank.state = state.run
//   }, 1000)
//   setTimeout(() => {
//     tank.state = state.stop
//   }, 3000)
// })

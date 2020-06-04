define("utils", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function calMove(org, step) {
        if (step === void 0) { step = 3; }
        var x, y;
        if (org >= 360) {
            org -= 360;
        }
        org = 2 * Math.PI / 360 * org;
        if (org >= 0 && org < 90) {
            x = Math.sin(org) * step;
            y = -Math.cos(org) * step;
            return {
                x: x, y: y
            };
        }
        if (org >= 90 && org < 180) {
            x = Math.cos(org - 90) * step;
            y = Math.sin(org - 90) * step;
            return {
                x: x, y: y
            };
        }
        if (org >= 180 && org < 270) {
            x = -Math.sin(org - 180) * step;
            y = Math.cos(org - 180) * step;
            return {
                x: x, y: y
            };
        }
        if (org >= 270 && org < 360) {
            x = -Math.cos(org - 270) * step;
            y = -Math.sin(org - 270) * step;
            return {
                x: x, y: y
            };
        }
    }
    exports.calMove = calMove;
    function checkHit(hiter1, hiter2) {
        var t1 = hiter1.y;
        var r1 = hiter1.width + hiter1.x;
        var b1 = hiter1.height + hiter1.y;
        var l1 = hiter1.x;
        var t2 = hiter2.y;
        var r2 = hiter2.width + hiter2.x;
        var b2 = hiter2.height + hiter2.y;
        var l2 = hiter2.x;
        if (t1 > b2 || r1 < l2 || b1 < t2 || l1 > r2) {
            return false;
        }
        else {
            return true;
        }
    }
    exports.checkHit = checkHit;
});
define("Shoot", ["require", "exports", "utils"], function (require, exports, utils_1) {
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
            this.id = Math.random();
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
});
define("tank", ["require", "exports", "utils", "Shoot", "map"], function (require, exports, utils_2, Shoot_1, map_1) {
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
            this.id = Math.random();
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
            this.runOrg = (this.runOrg % 360);
            var _a = utils_2.calMove(this.runOrg), x = _a.x, y = _a.y;
            if (this.x <= 0 && this.runOrg >= 180) {
                return;
            }
            if (this.y <= 0) {
                if (this.runOrg > 270 && this.runOrg <= 360) {
                    return;
                }
                if (this.runOrg >= 0 && this.runOrg < 90) {
                    return;
                }
            }
            if (this.y > map_1["default"].height) {
                if (this.runOrg > 90 && this.runOrg < 270) {
                    return;
                }
            }
            if (this.x > map_1["default"].width) {
                if (this.runOrg > 0 && this.runOrg < 180) {
                    return;
                }
            }
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
                }, 500);
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
            try {
                var runGame = eval(code);
                runGame(this);
            }
            catch (e) {
                console.log(e);
            }
        };
        return Tank;
    }());
    exports["default"] = Tank;
});
define("render", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var render = /** @class */ (function () {
        function render() {
            document.body.innerHTML += "<div id='map'></div>";
            window.onload = function () {
                console.log('oon');
                document.getElementById('btn').onclick = function () {
                    localStorage.code = document.getElementById('tank1')['value'];
                    localStorage.code2 = document.getElementById('tank2')['value'];
                };
            };
        }
        render.prototype.render = function (entry) {
            var id = "id-" + entry.id;
            if (document.getElementById(id)) {
                document.getElementById(id).style.left = entry.x + "px";
                document.getElementById(id).style.top = entry.y + "px";
            }
            else {
                document.getElementById('map').innerHTML += "<div id=\"" + id + "\" style='width: " + entry.width + "px;height: " + entry.height + "px;left:" + entry.x + "px;top:" + entry.y + "px;'></div>";
            }
            if (entry.life <= 0) {
                console.log('销毁', id);
                document.getElementById(id).style.display = 'none';
            }
        };
        return render;
    }());
    exports["default"] = render;
});
define("map", ["require", "exports", "tank", "utils", "render"], function (require, exports, tank_1, utils_3, render_1) {
    "use strict";
    exports.__esModule = true;
    var state;
    (function (state) {
        state[state["stop"] = 0] = "stop";
        state[state["run"] = 1] = "run";
    })(state || (state = {}));
    var code = "(function runGame(tank) {\n  tank.state = state.run\n  setInterval(() => {\n    var org = Math.random() * 100\n    tank.runOrg += org\n    tank.shoot(org)\n  },3000)\n})";
    var code2 = "(function runGame(tank) {\n  tank.state = state.run\n  setInterval(() => {\n    var org = Math.random() * 100\n    tank.runOrg += org\n    tank.shoot(org)\n  },3000)\n})";
    var GameMap = /** @class */ (function () {
        function GameMap() {
            this.width = GameMap.width;
            this.height = GameMap.height;
            this.x = 0;
            this.y = 0;
            this.heros = [];
            this.timer = null;
            this.entRender = new render_1["default"]();
            this.createTank();
            this.worldTime();
            this.id = Math.random();
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
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = setTimeout(function () {
                _this.worldTime();
            }, 60);
            this.update();
        };
        GameMap.prototype.update = function () {
            var _this = this;
            this.heros.map(function (tank) {
                tank.update();
                _this.entRender.render(tank);
                tank.shootMap = tank.shootMap.filter(function (shoot) {
                    shoot.update();
                    if (shoot.x < 0 || shoot.y < 0 || shoot.x > _this.width || shoot.y > _this.height) {
                        shoot.kill();
                        _this.entRender.render(shoot);
                        return false;
                    }
                    _this.entRender.render(shoot);
                    return true;
                });
            });
            this.checkHits();
        };
        GameMap.prototype.checkHits = function () {
            var _this = this;
            this.heros = this.heros.filter(function (tank) {
                _this.heros.map(function (others) {
                    others.shootMap = tank.shootMap.filter(function (shoot) {
                        shoot.update();
                        if (utils_3.checkHit(tank, shoot) && tank.name !== shoot.name) {
                            shoot.kill();
                            tank.beHurt();
                            _this.entRender.render(shoot);
                            console.warn('射中了');
                            return false;
                        }
                        _this.entRender.render(shoot);
                        return true;
                    });
                });
                _this.entRender.render(tank);
                return tank.life > 0;
            });
        };
        GameMap.width = 500;
        GameMap.height = 500;
        return GameMap;
    }());
    exports["default"] = GameMap;
});
// (function runGame(tank: Tank) {
//   console.log(tank)
//   setTimeout(() => {
//     tank.state = state.run
//   }, 1000)
//   setTimeout(() => {
//     tank.state = state.stop
//   }, 3000)
// })
define(["require", "exports", "map"], function (require, exports, map_2) {
    "use strict";
    var game = /** @class */ (function () {
        function game() {
            console.warn('tag', '');
            this.map = new map_2["default"]();
        }
        return game;
    }());
    new game();
});

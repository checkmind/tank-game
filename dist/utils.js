"use strict";
exports.__esModule = true;
function calMove(org, step) {
    if (step === void 0) { step = 1; }
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

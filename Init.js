"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Nightmare = require("Nightmare");
var events_1 = require("events");
var nightmare = new Nightmare({ show: true, loadImages: false });
var User = "****************";
var Pass = "****************";
var TotalRuns = 0;
var TotalBots = 10;
console.log("==========================================================================================");
console.log("                                   Run Bot OSM");
console.log("==========================================================================================");
console.log("\n\n\n\Login...");
function Start() {
    return __awaiter(this, void 0, void 0, function () {
        var cookies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, nightmare.cookies.clearAll()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, nightmare
                            .goto("https://en.onlinesoccermanager.com/Login")
                            .wait(500)
                            .click("p.checkbox-text")
                            .wait(500)
                            .click("button.btn-new")
                            .wait(500)
                            .wait("input#manager-name.form-control")
                            .wait("input#manager-name.form-control")
                            .wait(1000)
                            .type("input#manager-name.form-control", User)
                            .type("input#password.form-control", Pass)
                            .click("div.tab.front form button.btn")
                            .wait("div#bosscoins.balance span.balance-text")
                            .goto('https://en.onlinesoccermanager.com/BusinessClub')
                            .wait("div#bosscoins.balance span.balance-text")
                            .evaluate(function () {
                            return {
                                'name': document.querySelector('span.manager-name-text').innerHTML,
                                'coins': document.querySelector('div#bosscoins.balance span.balance-text').innerHTML
                            };
                        })
                            .then(function (ip) {
                            console.log("\nLogin Success");
                            console.log("-> User : " + ip['name'] + " \n-> BossCoins: " + ip['coins']);
                        })["catch"](function (error) {
                            console.log("Login Fail\n");
                            console.log("Error: " + error);
                        })];
                case 2:
                    _a.sent();
                    console.log("\n\n-> Get cookies from session\n\n");
                    return [4 /*yield*/, nightmare.cookies.get()];
                case 3:
                    cookies = _a.sent();
                    RunBots(cookies);
                    return [2 /*return*/];
            }
        });
    });
}
function RunBots(_ICookies) {
    return __awaiter(this, void 0, void 0, function () {
        var Nightmares, index, _bot;
        return __generator(this, function (_a) {
            console.log("Date: " + new Date().toISOString());
            Nightmares = [];
            for (index = 0; index < TotalBots; index++) {
                _bot = new BotOSM(index, _ICookies);
                _bot.BotState.on("Stop", function (data) {
                    if (Nightmares.every(function (elemnet) { return elemnet.Run == false; })) {
                        if (TotalRuns > 1) {
                            TotalRuns = 0;
                            sleep(60000).then(function () {
                                Start();
                            });
                        }
                        else {
                            RunBots(_ICookies);
                        }
                    }
                });
                Nightmares.push(_bot);
            }
            TotalRuns++;
            return [2 /*return*/];
        });
    });
}
var sleep = function (milliseconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
};
Start();
var BotOSM = /** @class */ (function () {
    function BotOSM(_botNumber, _ICookies) {
        this.Run = false;
        this.BotState = new events_1.EventEmitter();
        this.Run = true;
        this.botNumber = _botNumber;
        this.ICookies = _ICookies;
        this.Nightmare = new Nightmare({
            show: true,
            loadImages: false
        });
        this.StartBot();
    }
    BotOSM.prototype.StartBot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Nightmare.goto("https://en.onlinesoccermanager.com/Login")
                            .cookies.set(this.ICookies)
                            .goto('https://en.onlinesoccermanager.com/BusinessClub')
                            .wait("div.dude-container.tv div.glow")
                            .wait(11000)
                            .click('div.business-club-click-areas:nth-of-type(1) div.television-loader div.click-area')
                            .wait(29000)
                            .wait(15000)
                            .end()
                            .then(function () {
                            console.log("-> Bot n\u00BA" + _this.botNumber + " finish");
                            _this.Run = false;
                            _this.BotState.emit("Stop", _this.Run);
                        })["catch"](console.log)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BotOSM;
}());

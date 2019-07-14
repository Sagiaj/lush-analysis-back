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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = __importDefault(require("firebase"));
require("firebase/firestore");
var firebase_2 = __importDefault(require("../config/firebase"));
var FirebaseCollectionSchema;
(function (FirebaseCollectionSchema) {
    FirebaseCollectionSchema["DAILY_TRAFFIC_ANALYSIS"] = "daily_traffic_analysis";
    FirebaseCollectionSchema["REFERER_ANALYSIS"] = "referer_analysis";
})(FirebaseCollectionSchema || (FirebaseCollectionSchema = {}));
;
firebase_1.default.initializeApp(firebase_2.default);
var FirebaseService = /** @class */ (function () {
    function FirebaseService() {
    }
    FirebaseService.getDB = function (col) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (Object.values(FirebaseCollectionSchema).indexOf(col) === -1) {
                            return [2 /*return*/, Promise.reject("Collection \"" + col + "\" was not found.")];
                        }
                        return [4 /*yield*/, FirebaseService.db.collection(col)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseService.incrementDocumentField = function (document, field) {
        return __awaiter(this, void 0, void 0, function () {
            var batch, _a;
            return __generator(this, function (_b) {
                try {
                    batch = FirebaseService.db.batch();
                    batch.set(document, (_a = {}, _a[field] = FirebaseService.increment, _a), { merge: true });
                    batch.commit();
                    return [2 /*return*/, Promise.resolve(true)];
                }
                catch (err) {
                    return [2 /*return*/, Promise.reject(err)];
                }
                return [2 /*return*/];
            });
        });
    };
    FirebaseService.getOrSetFBDoc = function (documentRef, defaultObject) {
        if (defaultObject === void 0) { defaultObject = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, documentRef.get()];
                    case 1:
                        if (!!(_a.sent()).exists) return [3 /*break*/, 3];
                        return [4 /*yield*/, documentRef.set(defaultObject)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, documentRef];
                    case 4:
                        err_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseService.getOrSetFBCol = function (collectionRef, defaultObject) {
        if (defaultObject === void 0) { defaultObject = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, collectionRef.get()];
                    case 1:
                        if (!(_a.sent()).empty) return [3 /*break*/, 3];
                        return [4 /*yield*/, collectionRef.add(defaultObject)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, collectionRef];
                    case 4:
                        err_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_3)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseService.incrementRefererByDate = function (referer) {
        return __awaiter(this, void 0, void 0, function () {
            var date, analysisCol, domainDoc, datesCol, curDateDoc, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        console.log('referring!', referer);
                        date = new Date().toLocaleDateString().replace(/\//g, '-');
                        return [4 /*yield*/, FirebaseService.getDB(FirebaseCollectionSchema.REFERER_ANALYSIS)];
                    case 1:
                        analysisCol = _a.sent();
                        return [4 /*yield*/, FirebaseService.getOrSetFBDoc(analysisCol.doc(referer))];
                    case 2:
                        domainDoc = _a.sent();
                        return [4 /*yield*/, FirebaseService.getOrSetFBCol(domainDoc.collection("dates"))];
                    case 3:
                        datesCol = _a.sent();
                        return [4 /*yield*/, FirebaseService.getOrSetFBDoc(datesCol.doc(date), { dateTime: new Date() })];
                    case 4:
                        curDateDoc = _a.sent();
                        FirebaseService.incrementDocumentField(curDateDoc, "visits");
                        FirebaseService.incrementDocumentField(domainDoc, "totalVisits");
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _a.sent();
                        return [2 /*return*/, Promise.resolve(err_4)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseService.getDataByDateRange = function (start, end) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var analysisCol, results, datesDocs, resolvedDateDocs, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, FirebaseService.getDB(FirebaseCollectionSchema.REFERER_ANALYSIS)];
                    case 1:
                        analysisCol = _a.sent();
                        return [4 /*yield*/, analysisCol.get()];
                    case 2:
                        results = (_a.sent()).docs.map(function (a) { return ({ ref: a.ref, id: a.id }); });
                        datesDocs = results.map(function (_a) {
                            var id = _a.id, ref = _a.ref;
                            return __awaiter(_this, void 0, void 0, function () {
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = {
                                                site: id
                                            };
                                            return [4 /*yield*/, ref.collection('dates')
                                                    .where('dateTime', '>=', new Date(start))
                                                    .where('dateTime', '<', new Date(end))
                                                    .get()];
                                        case 1: return [4 /*yield*/, (_c.sent()).docs.map(function (doc) { return ({ date: doc.id, visits: doc.data().visits }); })];
                                        case 2: return [2 /*return*/, (_b.visits = _c.sent(),
                                                _b)];
                                    }
                                });
                            });
                        });
                        return [4 /*yield*/, Promise.all(datesDocs.map(function (a) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, a];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 3:
                        resolvedDateDocs = _a.sent();
                        return [4 /*yield*/, resolvedDateDocs.map(function (doc) { return ({ site: doc.site, visits: doc.visits }); }).filter(function (obj) { return !!obj.visits.length; })];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        err_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_5)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseService.db = firebase_1.default.firestore(firebase_1.default.app());
    FirebaseService.increment = firebase_1.default.firestore.FieldValue.increment(1);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;

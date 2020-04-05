"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var file_1 = require("../types/api/file");
var transformDataBaseContent = function (_a) {
    var type = _a.type, data = _a.data;
    if (type === file_1.Enum_transformDataBaseEnum.STRINGIFY) {
        var temp = [];
        if (!Array.isArray(data)) {
            console.error("transformDataBaseContent stringify need a array");
        }
        else {
            temp = data;
        }
        return JSON.stringify(temp);
    }
    if (type === file_1.Enum_transformDataBaseEnum.PARSE) {
        var temp = [];
        if (typeof data !== "string") {
            console.error("transformDataBaseContent parse need a string");
            return temp;
        }
        try {
            temp = JSON.parse(data);
        }
        catch (e) {
            console.error("transformDataBaseContent " + e.toString());
        }
        if (!Array.isArray(temp)) {
            console.error("transformDataBaseContent parse result error");
            return [];
        }
        return temp;
    }
    return "";
};
var getDataBasePath = function () {
    var homeDir = utils_1.Utils.getUserHomeDirectory();
    return path_1.default.join(homeDir, constants_1.CONSTANTS.DB_FILE_NAME);
};
// const createDataBaseFile = async () => {
//   const [error] = await Utils.awaitWrap<void, NodeJS.ErrnoException>(
//     fs.promises.writeFile(
//       getDataBasePath(),
//       transformDataBaseContent({
//         type: Enum_transformDataBaseEnum.STRINGIFY,
//         data: CONSTANTS.INITIAL_TASK_LIST(),
//       })
//     )
//   );
//   if (error) {
//     Utils.logErrorAndExitProcess(error);
//     return;
//   }
// };
var updateTaskList = function (taskList) { return __awaiter(void 0, void 0, void 0, function () {
    var error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.Utils.awaitWrap(fs_1.default.promises.writeFile(getDataBasePath(), transformDataBaseContent({ type: file_1.Enum_transformDataBaseEnum.STRINGIFY, data: taskList })))];
            case 1:
                error = (_a.sent())[0];
                if (error) {
                    utils_1.Utils.logErrorAndExitProcess(error);
                    return [2 /*return*/];
                }
                return [2 /*return*/];
        }
    });
}); };
var getTaskList = function () { return __awaiter(void 0, void 0, void 0, function () {
    var taskList, _a, error, fileContent;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, utils_1.Utils.awaitWrap(fs_1.default.promises.readFile(getDataBasePath(), { encoding: "utf8", flag: "a+" }))];
            case 1:
                _a = _b.sent(), error = _a[0], fileContent = _a[1];
                if (error) {
                    utils_1.Utils.logErrorAndExitProcess(error);
                    // if (error.code !== CONSTANTS.FILE_NOT_EXIST_ERROR) {
                    //   Utils.logErrorAndExitProcess(error);
                    //   return;
                    // }
                    // await createDataBaseFile();
                    // dataBaseContent = CONSTANTS.INITIAL_TASK_LIST();
                    return [2 /*return*/, []];
                }
                taskList = transformDataBaseContent({
                    type: file_1.Enum_transformDataBaseEnum.PARSE,
                    data: fileContent || "",
                });
                return [2 /*return*/, taskList];
        }
    });
}); };
var API_FILE = {
    getTaskList: getTaskList,
    updateTaskList: updateTaskList,
};
exports.API_FILE = API_FILE;

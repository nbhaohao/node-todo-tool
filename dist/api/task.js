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
Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = require("./file");
var cliSelect_1 = require("./cliSelect");
var constants_1 = require("../constants");
var utils_1 = require("../utils");
var generateTask = function (todoName, done) {
    if (done === void 0) { done = false; }
    return {
        title: todoName,
        done: done,
    };
};
var transformTaskToString = function (task, index) {
    return index + 1 + "-[" + (task.done ? constants_1.CONSTANTS.TASK_COMPLETE : constants_1.CONSTANTS.TASK_TODO) + "]-" + task.title;
};
var transformTaskListToString = function (taskList) {
    if (taskList.length === 0) {
        return "暂无任务";
    }
    return taskList.map(function (task, index) { return transformTaskToString(task, index); }).join("\n");
};
var printTaskList = function (taskList) {
    utils_1.Utils.logResult("------");
    utils_1.Utils.logResult(transformTaskListToString(taskList));
    utils_1.Utils.logResult("------");
};
var handleCliAddTask = function (taskList) { return __awaiter(void 0, void 0, void 0, function () {
    var newTaskName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cliSelect_1.API_CLI_SELECT.showTaskNameInput()];
            case 1:
                newTaskName = _a.sent();
                if (!newTaskName) {
                    console.log(constants_1.CONSTANTS.MESSAGE_EMPTY_TITLE);
                    void showTaskList(taskList);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, addTask(newTaskName, taskList, function (newTaskList) {
                        void showTaskList(newTaskList);
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var handleModifyTask = function (chooseTaskIndex, taskList) { return __awaiter(void 0, void 0, void 0, function () {
    var modifyTaskType, index, updateAndBackToMain, _a, newTitle;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, cliSelect_1.API_CLI_SELECT.showModifyTask()];
            case 1:
                modifyTaskType = _b.sent();
                index = Number(chooseTaskIndex);
                updateAndBackToMain = function (newTaskList) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, file_1.API_FILE.updateTaskList(newTaskList)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, showTaskList(newTaskList)];
                            case 2:
                                void (_a.sent());
                                return [2 /*return*/];
                        }
                    });
                }); };
                _a = modifyTaskType;
                switch (_a) {
                    case constants_1.CONSTANTS.CLI_SELECT_BACK: return [3 /*break*/, 2];
                    case constants_1.CONSTANTS.CLI_SELECT_MARK_AS_DONE: return [3 /*break*/, 4];
                    case constants_1.CONSTANTS.CLI_SELECT_MARK_AS_UNDONE: return [3 /*break*/, 6];
                    case constants_1.CONSTANTS.CLI_SELECT_MODIFY_TASK_TITLE: return [3 /*break*/, 8];
                    case constants_1.CONSTANTS.CLI_SELECT_DELETE_TASK: return [3 /*break*/, 11];
                }
                return [3 /*break*/, 13];
            case 2: return [4 /*yield*/, showTaskList(taskList)];
            case 3:
                void (_b.sent());
                return [3 /*break*/, 13];
            case 4:
                taskList[index].done = true;
                return [4 /*yield*/, updateAndBackToMain(taskList)];
            case 5:
                _b.sent();
                return [3 /*break*/, 13];
            case 6:
                taskList[Number(chooseTaskIndex)].done = false;
                return [4 /*yield*/, updateAndBackToMain(taskList)];
            case 7:
                _b.sent();
                return [3 /*break*/, 13];
            case 8: return [4 /*yield*/, cliSelect_1.API_CLI_SELECT.showTaskNameInput(taskList[index].title)];
            case 9:
                newTitle = _b.sent();
                taskList[index].title = newTitle;
                return [4 /*yield*/, updateAndBackToMain(taskList)];
            case 10:
                _b.sent();
                return [3 /*break*/, 13];
            case 11:
                taskList.splice(Number(chooseTaskIndex), 1);
                return [4 /*yield*/, updateAndBackToMain(taskList)];
            case 12:
                _b.sent();
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
var showTaskList = function (taskListValue) { return __awaiter(void 0, void 0, void 0, function () {
    var taskList, _a, choose;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!taskListValue) return [3 /*break*/, 1];
                _a = taskListValue.concat();
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, file_1.API_FILE.getTaskList()];
            case 2:
                _a = _b.sent();
                _b.label = 3;
            case 3:
                taskList = _a;
                return [4 /*yield*/, cliSelect_1.API_CLI_SELECT.showTaskList(taskList)];
            case 4:
                choose = _b.sent();
                if (choose === constants_1.CONSTANTS.CLI_SELECT_EXIT) {
                    return [2 /*return*/];
                }
                if (!(choose === constants_1.CONSTANTS.CLI_SELECT_ADD_TASK)) return [3 /*break*/, 6];
                return [4 /*yield*/, handleCliAddTask(taskList)];
            case 5:
                void (_b.sent());
                return [2 /*return*/];
            case 6: return [4 /*yield*/, handleModifyTask(choose, taskList)];
            case 7:
                void (_b.sent());
                return [2 /*return*/];
        }
    });
}); };
var addTask = function (todoName, taskListValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var taskList, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!taskListValue) return [3 /*break*/, 1];
                _a = taskListValue.concat();
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, file_1.API_FILE.getTaskList()];
            case 2:
                _a = _b.sent();
                _b.label = 3;
            case 3:
                taskList = _a;
                taskList.push(generateTask(todoName));
                return [4 /*yield*/, file_1.API_FILE.updateTaskList(taskList)];
            case 4:
                _b.sent();
                if (callback) {
                    callback(taskList);
                }
                else {
                    utils_1.Utils.logResult(constants_1.CONSTANTS.MESSAGE_ADD_TASK_SUCCESS);
                    printTaskList(taskList);
                }
                return [2 /*return*/];
        }
    });
}); };
var clearTask = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, file_1.API_FILE.updateTaskList(constants_1.CONSTANTS.INITIAL_TASK_LIST())];
            case 1:
                _a.sent();
                utils_1.Utils.logResult(constants_1.CONSTANTS.MESSAGE_CLEAR_SUCCESS);
                return [2 /*return*/];
        }
    });
}); };
var API_TASK = {
    addTask: addTask,
    clearTask: clearTask,
    showTaskList: showTaskList,
    transformTaskToString: transformTaskToString,
};
exports.API_TASK = API_TASK;

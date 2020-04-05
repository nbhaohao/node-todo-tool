"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = __importStar(require("inquirer"));
var task_1 = require("./task");
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var showModifyTask = function () {
    var choices = [
        {
            name: "返回",
            value: constants_1.CONSTANTS.CLI_SELECT_BACK,
        },
        {
            name: "标记为完成",
            value: constants_1.CONSTANTS.CLI_SELECT_MARK_AS_DONE,
        },
        {
            name: "标记为未完成",
            value: constants_1.CONSTANTS.CLI_SELECT_MARK_AS_UNDONE,
        },
        {
            name: "修改标题",
            value: constants_1.CONSTANTS.CLI_SELECT_MODIFY_TASK_TITLE,
        },
        {
            name: "删除",
            value: constants_1.CONSTANTS.CLI_SELECT_DELETE_TASK,
        },
    ];
    return inquirer.prompt({ type: "list", name: "modifyTask", message: "请选择要执行的操作", choices: choices }).then(function (answers) { return answers.modifyTask; });
};
var showTaskNameInput = function (defaultName) {
    return inquirer
        .prompt({ type: "input", name: "newTaskName", message: "请输入任务标题", default: defaultName || "" })
        .then(function (answers) {
        return answers.newTaskName;
    })
        .catch(function (error) {
        utils_1.Utils.logErrorAndExitProcess(error);
    });
};
var showTaskList = function (taskList) {
    var inquirerChoices = taskList.map(function (task, index) { return ({ name: task_1.API_TASK.transformTaskToString(task, index), value: index.toString() }); });
    var extraOperations = [
        {
            name: "创建任务",
            value: constants_1.CONSTANTS.CLI_SELECT_ADD_TASK,
        },
        {
            name: "退出",
            value: constants_1.CONSTANTS.CLI_SELECT_EXIT,
        },
    ];
    return inquirer
        // .prompt({ type: "list", name: "taskList", message: "请选择要执行的操作", choices: inquirerChoices.concat(extraOperations) })
        .prompt({ type: "list", name: "taskList", message: "请选择要执行的操作", choices: inquirerChoices.concat(extraOperations) })
        .then(function (answers) {
        return answers.taskList;
        // await API_FILE.updateTaskList(newTaskList);
        // Utils.logResult(CONSTANTS.MESSAGE_UPDATE_TASK_SUCCESS);
    })
        .catch(function (error) {
        utils_1.Utils.logErrorAndExitProcess(error);
    });
};
var API_CLI_SELECT = {
    showTaskList: showTaskList,
    showTaskNameInput: showTaskNameInput,
    showModifyTask: showModifyTask,
};
exports.API_CLI_SELECT = API_CLI_SELECT;

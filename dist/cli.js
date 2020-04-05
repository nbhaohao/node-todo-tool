#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander = __importStar(require("commander"));
var constants_1 = require("./constants");
var task_1 = require("./api/task");
// 指定 -V 版本
var registerVersion = function (program) {
    program.version(constants_1.CONSTANTS.VERSION);
};
// 注册 actions
var registerActions = function (program) {
    // 添加一个任务
    program
        .command("add <taskName>")
        .description("add a task")
        .action(function (taskName) { return task_1.API_TASK.addTask(taskName, null, null); });
    // 删除所有任务
    program.command("clear").description("clear all tasks").action(task_1.API_TASK.clearTask);
    // 显示所有任务
    program
        .command("list", { isDefault: true })
        .description("show all tasks")
        .action(function () {
        void task_1.API_TASK.showTaskList();
    });
};
// 启动
var start = function (program) {
    program.parse(process.argv);
};
var main = function () {
    var program = new commander.Command();
    registerVersion(program);
    registerActions(program);
    start(program);
};
main();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 获得用户的 home 目录
var getUserHomeDirectory = function () {
    var homedir = require("os").homedir();
    return process.env.HOME || homedir;
};
// 处理 async/await 错误
var awaitWrap = function (promise) {
    return promise
        .then(function (data) { return [null, data]; })
        .catch(function (err) { return [err, null]; });
};
// log Error 和退出程序
var logErrorAndExitProcess = function (error) {
    console.error("error: " + error.toString());
    process.exit(-1);
};
// 打印一些信息
var logResult = function (msg) {
    console.log(msg);
};
// 打印 error
var logError = function (msg) {
    if (process.env.DEBUG) {
        console.error(msg);
    }
};
var Utils = {
    getUserHomeDirectory: getUserHomeDirectory,
    awaitWrap: awaitWrap,
    logErrorAndExitProcess: logErrorAndExitProcess,
    logResult: logResult,
    logError: logError,
};
exports.Utils = Utils;

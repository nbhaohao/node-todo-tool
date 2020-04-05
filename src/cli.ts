#!/usr/bin/env node

import * as commander from "commander";
import { CONSTANTS } from "./constants";
import { API_TASK } from "./api/task";

// 指定 -V 版本
const registerVersion = (program: commander.Command) => {
  program.version(CONSTANTS.VERSION);
};

// 注册 actions
const registerActions = (program: commander.Command) => {
  // 添加一个任务
  program
    .command("add <taskName>")
    .description("add a task")
    .action((taskName) => API_TASK.addTask(taskName, null, null));

  // 删除所有任务
  program.command("clear").description("clear all tasks").action(API_TASK.clearTask);

  // 显示所有任务
  program
    .command("list", { isDefault: true })
    .description("show all tasks")
    .action(() => {
      void API_TASK.showTaskList();
    });
};

// 启动
const start = (program: commander.Command) => {
  program.parse(process.argv);
};

const main = () => {
  const program = new commander.Command();
  registerVersion(program);
  registerActions(program);
  start(program);
};

main();

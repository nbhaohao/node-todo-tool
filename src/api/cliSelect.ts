import * as inquirer from "inquirer";
import { TaskList } from "../types/constants";
import { API_TASK } from "./task";
import { Utils } from "../utils";
import { CONSTANTS } from "../constants";

const showModifyTask = () => {
  const choices = [
    {
      name: "返回",
      value: CONSTANTS.CLI_SELECT_BACK,
    },
    {
      name: "标记为完成",
      value: CONSTANTS.CLI_SELECT_MARK_AS_DONE,
    },
    {
      name: "标记为未完成",
      value: CONSTANTS.CLI_SELECT_MARK_AS_UNDONE,
    },
    {
      name: "修改标题",
      value: CONSTANTS.CLI_SELECT_MODIFY_TASK_TITLE,
    },
    {
      name: "删除",
      value: CONSTANTS.CLI_SELECT_DELETE_TASK,
    },
  ];
  return inquirer.prompt({ type: "list", name: "modifyTask", message: "请选择要执行的操作", choices }).then((answers) => answers.modifyTask);
};

const showTaskNameInput = (defaultName?: string) => {
  return inquirer
    .prompt({ type: "input", name: "newTaskName", message: "请输入任务标题", default: defaultName || "" })
    .then((answers) => {
      return answers.newTaskName;
    })
    .catch((error) => {
      Utils.logErrorAndExitProcess(error);
    });
};

const showTaskList = (taskList: TaskList) => {
  const inquirerChoices = taskList.map((task, index) => ({ name: API_TASK.transformTaskToString(task, index), value: index.toString() }));
  const extraOperations = [
    {
      name: "创建任务",
      value: CONSTANTS.CLI_SELECT_ADD_TASK,
    },
    {
      name: "退出",
      value: CONSTANTS.CLI_SELECT_EXIT,
    },
  ];
  return inquirer
    // .prompt({ type: "list", name: "taskList", message: "请选择要执行的操作", choices: inquirerChoices.concat(extraOperations) })
    .prompt({ type: "list", name: "taskList", message: "请选择要执行的操作", choices: inquirerChoices.concat(extraOperations) })
    .then((answers) => {
      return answers.taskList;
      // await API_FILE.updateTaskList(newTaskList);
      // Utils.logResult(CONSTANTS.MESSAGE_UPDATE_TASK_SUCCESS);
    })
    .catch((error) => {
      Utils.logErrorAndExitProcess(error);
    });
};

const API_CLI_SELECT = {
  showTaskList,
  showTaskNameInput,
  showModifyTask,
};

export { API_CLI_SELECT };

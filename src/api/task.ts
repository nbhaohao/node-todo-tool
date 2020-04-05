import { API_FILE } from "./file";
import { API_CLI_SELECT } from "./cliSelect";
import { CONSTANTS } from "../constants";
import { Task, TaskList } from "../types/constants";
import { Utils } from "../utils";

const generateTask = (todoName: string, done: boolean = false): Task => {
  return {
    title: todoName,
    done,
  };
};

const transformTaskToString = (task: Task, index: number): string => {
  return `${index + 1}-[${task.done ? CONSTANTS.TASK_COMPLETE : CONSTANTS.TASK_TODO}]-${task.title}`;
};

const transformTaskListToString = (taskList: TaskList): string => {
  if (taskList.length === 0) {
    return "暂无任务";
  }
  return taskList.map((task, index) => transformTaskToString(task, index)).join("\n");
};

const printTaskList = (taskList: TaskList) => {
  Utils.logResult("------");
  Utils.logResult(transformTaskListToString(taskList));
  Utils.logResult("------");
};

const handleCliAddTask = async (taskList: TaskList) => {
  const newTaskName = await API_CLI_SELECT.showTaskNameInput();
  if (!newTaskName) {
    console.log(CONSTANTS.MESSAGE_EMPTY_TITLE);
    void showTaskList(taskList);
    return;
  }
  await addTask(newTaskName, taskList, (newTaskList) => {
    void showTaskList(newTaskList);
  });
  return;
};

const handleModifyTask = async (chooseTaskIndex: string, taskList: TaskList): Promise<void> => {
  const modifyTaskType = await API_CLI_SELECT.showModifyTask();
  const index = Number(chooseTaskIndex);
  const updateAndBackToMain = async (newTaskList: TaskList) => {
    await API_FILE.updateTaskList(newTaskList);
    void (await showTaskList(newTaskList));
  };
  switch (modifyTaskType) {
    case CONSTANTS.CLI_SELECT_BACK:
      void (await showTaskList(taskList));
      break;
    case CONSTANTS.CLI_SELECT_MARK_AS_DONE:
      taskList[index].done = true;
      await updateAndBackToMain(taskList);
      break;
    case CONSTANTS.CLI_SELECT_MARK_AS_UNDONE:
      taskList[Number(chooseTaskIndex)].done = false;
      await updateAndBackToMain(taskList);
      break;
    case CONSTANTS.CLI_SELECT_MODIFY_TASK_TITLE:
      const newTitle = await API_CLI_SELECT.showTaskNameInput(taskList[index].title);
      taskList[index].title = newTitle;
      await updateAndBackToMain(taskList);
      break;
    case CONSTANTS.CLI_SELECT_DELETE_TASK:
      taskList.splice(Number(chooseTaskIndex), 1);
      await updateAndBackToMain(taskList);
      break;
  }
};

const showTaskList = async (taskListValue?: TaskList) => {
  const taskList = taskListValue ? taskListValue.concat() : await API_FILE.getTaskList();
  const choose = await API_CLI_SELECT.showTaskList(taskList);
  if (choose === CONSTANTS.CLI_SELECT_EXIT) {
    return;
  }
  if (choose === CONSTANTS.CLI_SELECT_ADD_TASK) {
    void (await handleCliAddTask(taskList));
    return;
  }
  void (await handleModifyTask(choose, taskList));
  // Utils.logResult(transformTaskToString(taskList));
};

const addTask = async (todoName: string, taskListValue: TaskList | null, callback: ((taskList: TaskList) => void) | null): Promise<void> => {
  const taskList = taskListValue ? taskListValue.concat() : await API_FILE.getTaskList();
  taskList.push(generateTask(todoName));
  await API_FILE.updateTaskList(taskList);
  if (callback) {
    callback(taskList);
  } else {
    Utils.logResult(CONSTANTS.MESSAGE_ADD_TASK_SUCCESS);
    printTaskList(taskList);
  }
};

const clearTask = async (): Promise<void> => {
  await API_FILE.updateTaskList(CONSTANTS.INITIAL_TASK_LIST());
  Utils.logResult(CONSTANTS.MESSAGE_CLEAR_SUCCESS);
};

const API_TASK = {
  addTask,
  clearTask,
  showTaskList,
  transformTaskToString,
};

export { API_TASK };

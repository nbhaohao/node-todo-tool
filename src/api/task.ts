import { API_FILE } from "./file";
import { CONSTANTS } from "../constants";
import { Task } from "../types/constants";
import { Utils } from "../utils";

const generateTask = (todoName: string, done: boolean = false): Task => {
  return {
    title: todoName,
    done,
  };
};

const addTask = async (todoName: string): Promise<void> => {
  const taskList = await API_FILE.getTaskList();
  taskList.push(generateTask(todoName));
  await API_FILE.updateTaskList(taskList);
  Utils.logResult(CONSTANTS.MESSAGE_ADD_TASK_SUCCESS);
  Utils.logResult("------");
  Utils.logResult(taskList.map((task, index) => `${index + 1}.${task.title}(${task.done ? CONSTANTS.TASK_COMPLETE : CONSTANTS.TASK_TODO})`).join("\n"));
  Utils.logResult("------");
};

const clearTask = async (): Promise<void> => {
  await API_FILE.updateTaskList(CONSTANTS.INITIAL_TASK_LIST());
  Utils.logResult(CONSTANTS.MESSAGE_CLEAR_SUCCESS);
};

const API_TASK = {
  addTask,
  clearTask,
};

export { API_TASK };

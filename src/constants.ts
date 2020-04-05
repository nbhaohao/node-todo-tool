import packageJSON from "../package.json";
import { TaskList } from "./types/constants";

const VERSION = packageJSON.version;
const DB_FILE_NAME = ".node_todo_tool_db";
const INITIAL_TASK_LIST = (): TaskList => [];
const FILE_NOT_EXIST_ERROR = "ENOENT";

const TASK_COMPLETE = "完成";
const TASK_TODO = "未完成";

const MESSAGE_ADD_TASK_SUCCESS = "添加任务成功";
const MESSAGE_UPDATE_TASK_SUCCESS = "更新任务成功";
const MESSAGE_CLEAR_SUCCESS = "清除任务成功";
const MESSAGE_EMPTY_TITLE = "任务标题不得为空";

const CLI_SELECT_EXIT = "exist";
const CLI_SELECT_ADD_TASK = "addTask";
const CLI_SELECT_MARK_AS_DONE = "markDone";
const CLI_SELECT_BACK = "back";
const CLI_SELECT_MARK_AS_UNDONE = "markUndone";
const CLI_SELECT_MODIFY_TASK_TITLE = "modifyTitle";
const CLI_SELECT_DELETE_TASK = "deleteTask";

const CONSTANTS = {
  VERSION,
  DB_FILE_NAME,
  FILE_NOT_EXIST_ERROR,
  INITIAL_TASK_LIST,
  MESSAGE_ADD_TASK_SUCCESS,
  MESSAGE_UPDATE_TASK_SUCCESS,
  MESSAGE_CLEAR_SUCCESS,
  TASK_COMPLETE,
  TASK_TODO,
  CLI_SELECT_EXIT,
  CLI_SELECT_ADD_TASK,
  MESSAGE_EMPTY_TITLE,
  CLI_SELECT_MARK_AS_DONE,
  CLI_SELECT_MARK_AS_UNDONE,
  CLI_SELECT_MODIFY_TASK_TITLE,
  CLI_SELECT_DELETE_TASK,
  CLI_SELECT_BACK,
};

export { CONSTANTS };

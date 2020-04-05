import packageJSON from "../package.json";
import { TaskList } from "./types/constants";

const VERSION = packageJSON.version;
const DB_FILE_NAME = ".node_todo_tool_db";
const INITIAL_TASK_LIST = (): TaskList => [];
const FILE_NOT_EXIST_ERROR = "ENOENT";

const TASK_COMPLETE = "完成";
const TASK_TODO = "未完成";

const MESSAGE_ADD_TASK_SUCCESS = "添加任务成功";
const MESSAGE_CLEAR_SUCCESS = "清除任务成功";

const CONSTANTS = {
  VERSION,
  DB_FILE_NAME,
  FILE_NOT_EXIST_ERROR,
  INITIAL_TASK_LIST,
  MESSAGE_ADD_TASK_SUCCESS,
  MESSAGE_CLEAR_SUCCESS,
  TASK_COMPLETE,
  TASK_TODO,
};

export { CONSTANTS };

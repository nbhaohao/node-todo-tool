import { TaskList } from "./types/constants";
declare const CONSTANTS: {
    VERSION: string;
    DB_FILE_NAME: string;
    FILE_NOT_EXIST_ERROR: string;
    INITIAL_TASK_LIST: () => TaskList;
    MESSAGE_ADD_TASK_SUCCESS: string;
    MESSAGE_UPDATE_TASK_SUCCESS: string;
    MESSAGE_CLEAR_SUCCESS: string;
    TASK_COMPLETE: string;
    TASK_TODO: string;
    CLI_SELECT_EXIT: string;
    CLI_SELECT_ADD_TASK: string;
    MESSAGE_EMPTY_TITLE: string;
    CLI_SELECT_MARK_AS_DONE: string;
    CLI_SELECT_MARK_AS_UNDONE: string;
    CLI_SELECT_MODIFY_TASK_TITLE: string;
    CLI_SELECT_DELETE_TASK: string;
    CLI_SELECT_BACK: string;
};
export { CONSTANTS };
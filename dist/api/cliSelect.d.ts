import { TaskList } from "../types/constants";
declare const API_CLI_SELECT: {
    showTaskList: (taskList: TaskList) => Promise<any>;
    showTaskNameInput: (defaultName?: string | undefined) => Promise<any>;
    showModifyTask: () => Promise<any>;
};
export { API_CLI_SELECT };

import { TaskList } from "../types/constants";
declare const API_FILE: {
    getTaskList: () => Promise<TaskList>;
    updateTaskList: (taskList: TaskList) => Promise<void>;
};
export { API_FILE };

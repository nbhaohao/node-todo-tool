import { Task, TaskList } from "../types/constants";
declare const API_TASK: {
    addTask: (todoName: string, taskListValue: TaskList | null, callback: ((taskList: TaskList) => void) | null) => Promise<void>;
    clearTask: () => Promise<void>;
    showTaskList: (taskListValue?: TaskList | undefined) => Promise<void>;
    transformTaskToString: (task: Task, index: number) => string;
};
export { API_TASK };

import fs from "fs";
import path from "path";
import { Utils } from "../utils";
import { CONSTANTS } from "../constants";
import { Enum_transformDataBaseEnum, Function_transformDataBaseContent } from "../types/api/file";
import { TaskList } from "../types/constants";

const transformDataBaseContent: Function_transformDataBaseContent = ({ type, data }: { type: Enum_transformDataBaseEnum; data: string | TaskList }): any => {
  if (type === Enum_transformDataBaseEnum.STRINGIFY) {
    let temp: TaskList = [];
    if (!Array.isArray(data)) {
      Utils.logError("transformDataBaseContent stringify need a array");
    } else {
      temp = data;
    }
    return JSON.stringify(temp);
  }
  if (type === Enum_transformDataBaseEnum.PARSE) {
    let temp: TaskList = [];
    if (typeof data !== "string") {
      Utils.logError("transformDataBaseContent parse need a string");
      return temp;
    }
    try {
      temp = JSON.parse(data);
    } catch (e) {
      Utils.logError(`transformDataBaseContent ${e.toString()}`);
    }
    if (!Array.isArray(temp)) {
      Utils.logError(`transformDataBaseContent parse result error`);
      return [];
    }
    return temp;
  }
  return "";
};

const getDataBasePath = () => {
  const homeDir = Utils.getUserHomeDirectory();
  return path.join(homeDir, CONSTANTS.DB_FILE_NAME);
};

// const createDataBaseFile = async () => {
//   const [error] = await Utils.awaitWrap<void, NodeJS.ErrnoException>(
//     fs.promises.writeFile(
//       getDataBasePath(),
//       transformDataBaseContent({
//         type: Enum_transformDataBaseEnum.STRINGIFY,
//         data: CONSTANTS.INITIAL_TASK_LIST(),
//       })
//     )
//   );
//   if (error) {
//     Utils.logErrorAndExitProcess(error);
//     return;
//   }
// };

const updateTaskList = async (taskList: TaskList): Promise<void> => {
  const [error] = await Utils.awaitWrap<void, NodeJS.ErrnoException>(
    fs.promises.writeFile(getDataBasePath(), transformDataBaseContent({ type: Enum_transformDataBaseEnum.STRINGIFY, data: taskList }))
  );
  if (error) {
    Utils.logErrorAndExitProcess(error);
    return;
  }
};

const getTaskList = async (): Promise<TaskList> => {
  let taskList: TaskList;
  const [error, fileContent] = await Utils.awaitWrap<string, NodeJS.ErrnoException>(fs.promises.readFile(getDataBasePath(), { encoding: "utf8", flag: "a+" }));
  if (error) {
    Utils.logErrorAndExitProcess(error);
    // if (error.code !== CONSTANTS.FILE_NOT_EXIST_ERROR) {
    //   Utils.logErrorAndExitProcess(error);
    //   return;
    // }
    // await createDataBaseFile();
    // dataBaseContent = CONSTANTS.INITIAL_TASK_LIST();
    return [];
  }
  taskList = transformDataBaseContent({
    type: Enum_transformDataBaseEnum.PARSE,
    data: fileContent || "",
  });
  return taskList;
};

const API_FILE = {
  getTaskList,
  updateTaskList,
};

export { API_FILE };

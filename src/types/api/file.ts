import { TaskList } from "../constants";

export enum Enum_transformDataBaseEnum {
  STRINGIFY = "stringify",
  PARSE = "parse",
}
export type Function_transformDataBaseContent = {
  (params: {
    type: Enum_transformDataBaseEnum.STRINGIFY;
    data: TaskList;
  }): string;
  (params: {
    type: Enum_transformDataBaseEnum.PARSE;
    data: string;
  }): TaskList;
  (params: { type: Enum_transformDataBaseEnum; data: string | TaskList }):
    | string
    | TaskList;
};

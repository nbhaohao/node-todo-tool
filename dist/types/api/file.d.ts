import { TaskList } from "../constants";
export declare enum Enum_transformDataBaseEnum {
    STRINGIFY = "stringify",
    PARSE = "parse"
}
export declare type Function_transformDataBaseContent = {
    (params: {
        type: Enum_transformDataBaseEnum.STRINGIFY;
        data: TaskList;
    }): string;
    (params: {
        type: Enum_transformDataBaseEnum.PARSE;
        data: string;
    }): TaskList;
    (params: {
        type: Enum_transformDataBaseEnum;
        data: string | TaskList;
    }): string | TaskList;
};

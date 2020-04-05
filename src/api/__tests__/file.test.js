jest.mock("path");
jest.mock("fs");
jest.mock("../../utils");
const fs = require("fs");
const { Utils } = require("../../utils");
const { API_FILE } = require("../file");
const { CONSTANTS } = require("../../constants");
const { Enum_transformDataBaseEnum } = require("../../types/api/file");

describe("file", () => {
  describe("getDataBasePath 函数", () => {
    test("可以正常拼接路径", () => {
      expect(API_FILE.getDataBasePath()).toBe(`/Fake/Home/${CONSTANTS.DB_FILE_NAME}`);
    });
  });
  describe("transformDataBaseContent 函数", () => {
    afterEach(() => {
      Utils.logError.mock.calls = [];
      Utils.logErrorAndExitProcess.mock.calls = [];
    });
    test("stringify", () => {
      expect(
        API_FILE.transformDataBaseContent({
          type: Enum_transformDataBaseEnum.STRINGIFY,
          data: [],
        })
      ).toBe(JSON.stringify([]));
      expect(
        API_FILE.transformDataBaseContent({
          type: Enum_transformDataBaseEnum.STRINGIFY,
          data: [{ title: "123", done: false }],
        })
      ).toBe(JSON.stringify([{ title: "123", done: false }]));
    });
    test("stringify 收到不是 array 的参数，报错并返回默认值", () => {
      expect(API_FILE.transformDataBaseContent({ type: Enum_transformDataBaseEnum.STRINGIFY, data: null })).toBe(JSON.stringify([]));
      expect(Utils.logError).toBeCalledTimes(1);
    });
    test("parse", () => {
      expect(
        API_FILE.transformDataBaseContent({
          type: Enum_transformDataBaseEnum.PARSE,
          data: JSON.stringify([{ title: "123" }]),
        })
      ).toEqual(JSON.parse(JSON.stringify([{ title: "123" }])));
    });
    test("parse 收到不是 string 的参数，报错并返回默认值", () => {
      expect(
        API_FILE.transformDataBaseContent({
          type: Enum_transformDataBaseEnum.PARSE,
          data: null,
        })
      ).toEqual(JSON.parse(JSON.stringify([])));
      expect(Utils.logError).toBeCalledTimes(1);
    });
    test("parse 收到 JSON.parse 会报错的 string 参数时，报错并返回默认值", () => {
      expect(
        API_FILE.transformDataBaseContent({
          type: Enum_transformDataBaseEnum.PARSE,
          data: "",
        })
      ).toEqual(JSON.parse(JSON.stringify([])));
      expect(Utils.logError).toBeCalledTimes(1);
    });
    test("parse 收到不合法的 string 的参数，报错并返回默认值", () => {
      expect(
        API_FILE.transformDataBaseContent({
          type: Enum_transformDataBaseEnum.PARSE,
          data: "123",
        })
      ).toEqual(JSON.parse(JSON.stringify([])));
      expect(Utils.logError).toBeCalledTimes(1);
    });
  });
  describe("getTaskList 函数", () => {
    test("fs.promises.readFile 的第一个参数是 数据库的路径", async (done) => {
      Utils.awaitWrap.mockReturnValue(Promise.resolve([null, JSON.stringify([{ title: "123", done: false }])]));
      await API_FILE.getTaskList();
      expect(fs.promises.readFile).toBeCalledTimes(1)
      expect(fs.promises.readFile.mock.calls[0][0]).toBe(API_FILE.getDataBasePath())
      done()
    })
    test("可以正常返回文件内容", async (done) => {
      Utils.awaitWrap.mockReturnValue(Promise.resolve([null, JSON.stringify([{ title: "123", done: false }])]));
      const result = await API_FILE.getTaskList();
      expect(result).toEqual([{ title: "123", done: false }]);
      done();
    });
    test("可以处理错误，并返回默认值", async (done) => {
      Utils.awaitWrap.mockReturnValue(Promise.resolve([new Error("Test"), JSON.stringify([{ title: "123", done: false }])]));
      const result = await API_FILE.getTaskList();
      expect(Utils.logErrorAndExitProcess).toBeCalledTimes(1);
      expect(result).toEqual([]);
      done();
    });
  });
});

// 获得用户的 home 目录
const getUserHomeDirectory = () => {
  const homedir = require("os").homedir();
  return process.env.HOME || homedir;
};

// 处理 async/await 错误
const awaitWrap = <T, U = any>(promise: Promise<T>): Promise<[U | null, T | null]> => {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, null]>((err) => [err, null]);
};

// log Error 和退出程序
const logErrorAndExitProcess = (error: NodeJS.ErrnoException) => {
  console.error(`error: ${error.toString()}`);
  process.exit(-1);
};

// 打印一些信息
const logResult = (msg: string) => {
  console.log(msg);
};

const Utils = {
  getUserHomeDirectory,
  awaitWrap,
  logErrorAndExitProcess,
  logResult
};

export { Utils };

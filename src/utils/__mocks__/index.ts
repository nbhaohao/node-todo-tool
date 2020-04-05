const Utils = {
  getUserHomeDirectory: () => {
    return "/Fake/Home";
  },
  logError: jest.fn(),
  awaitWrap: jest.fn(),
  logErrorAndExitProcess: jest.fn(),
};

export { Utils };

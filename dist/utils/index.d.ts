/// <reference types="node" />
declare const Utils: {
    getUserHomeDirectory: () => any;
    awaitWrap: <T, U = any>(promise: Promise<T>) => Promise<[U | null, T | null]>;
    logErrorAndExitProcess: (error: NodeJS.ErrnoException) => never;
    logResult: (msg: string) => void;
    logError: (msg: string) => void;
};
export { Utils };

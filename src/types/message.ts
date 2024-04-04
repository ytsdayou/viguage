export enum MsgStatus {
  SUCC = 'succ',
  ERROR = 'error',
}
export type MsgData = {
  status: MsgStatus;
  message: any;
};
export type MsgResult = {
  event: string;
  data: MsgData;
};
export enum Events {
  FileInfo = 'fileinfo',
  DialogOpenFile = 'dialog-open-file',
}
export enum Channels {
  IPC = 'ipc-channel',
}

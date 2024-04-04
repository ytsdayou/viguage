/* eslint import/prefer-default-export: off */
import { MsgResult, MsgStatus, Events } from '../../types/message';
import { getFiles } from './file';

export function msgHandle(msg: string): MsgResult {
  const t = typeof msg;
  let ret: MsgResult;
  ret = {
    event: 'filelist',
    data: {
      status: MsgStatus.ERROR,
      message: 'unexpected error',
    },
  };

  switch (t) {
    case 'string':
      if (msg === Events.FileInfo) {
        ret = {
          event: msg,
          data: getFiles(),
        };
      }
      break;
    case 'object':
      break;
    default:
      break;
  }

  return ret;
}

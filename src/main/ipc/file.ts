/* eslint import/prefer-default-export: off */
import { MsgData, MsgStatus } from '../../types/message';

const fs = require('fs');

export function getFiles(): MsgData {
  return {
    status: MsgStatus.SUCC,
    message: fs.readdirSync(__dirname),
  };
}

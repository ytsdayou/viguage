import { MsgStatus } from '../../types/message';

const fs = require('fs');
const { convert } = require('subtitle-converter');

// function groupSubtitlesByTime(vttContent: string) {
//   const regex =
//     /(\d+\n(\d{2}:\d{2}:\d{2}.\d{3} --> \d{2}:\d{2}:\d{2}.\d{3})\s*(.*))/g;
//   const groups = new Map();

//   const match = regex.exec(vttContent);
//   while (match !== null) {
//     const startTime = match[1];
//     const endTime = match[2];
//     const text = match[3];

//     if (!groups.has(startTime)) {
//       groups.set(startTime, []);
//     }

//     groups.get(startTime).push({ startTime, endTime, text });
//   }

//   return groups;
// }

export default function ParseSubtitle(filepath: string) {
  const subtitleText = fs.readFileSync(filepath, 'utf-8');
  const outputExtension = '.vtt'; // conversion is based on output file extension
  const options = {
    removeTextFormatting: true,
    timecodeOverlapLimiter: 1,
  };

  const { subtitle, status } = convert(subtitleText, outputExtension, options);

  if (status.success) {
    return {
      status: MsgStatus.SUCC,
      //   message: groupSubtitlesByTime(subtitle),
      message: subtitle,
    };
  }
  return {
    status: MsgStatus.ERROR,
    message: status,
  };
}

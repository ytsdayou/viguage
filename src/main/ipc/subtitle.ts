import { MsgStatus } from '../../types/message';

const fs = require('fs');
const { convert } = require('subtitle-converter');

function groupSubtitlesByTime(vttContent: string) {
  const tmp = vttContent.split('\r\n\r\n');
  const subtitles = tmp.map((block: string) => {
    return block.split('\r\n');
  });
  return subtitles;
}

export default function ParseSubtitle(filepath: string) {
  const subtitleText = fs.readFileSync(filepath, 'utf-8');
  const outputExtension = '.srt'; // conversion is based on output file extension
  const options = {
    removeTextFormatting: true,
    timecodeOverlapLimiter: 1,
  };

  const { subtitle, status } = convert(subtitleText, outputExtension, options);

  if (status.success) {
    return {
      status: MsgStatus.SUCC,
      message: groupSubtitlesByTime(subtitle),
      // message: subtitle,
    };
  }
  return {
    status: MsgStatus.ERROR,
    message: status,
  };
}

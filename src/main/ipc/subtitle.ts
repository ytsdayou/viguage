import { parseSync, formatTimestamp } from 'subtitle';
import { MsgStatus } from '../../types/message';

const fs = require('fs');

function groupSubtitlesByTime(vttContent: any) {
  // const tmp = vttContent.split('\r\n\r\n');
  const subtitles = vttContent.map((block: any, index: number) => {
    return [
      index,
      formatTimestamp(block.data.start),
      formatTimestamp(block.data.end),
      ...block.data.text.split('\n'),
    ];
  });
  return subtitles;
}

export default function ParseSubtitle(filepath: string) {
  const subtitleText = fs.readFileSync(filepath, 'utf-8');
  const sections = parseSync(subtitleText);
  return {
    status: MsgStatus.SUCC,
    message: groupSubtitlesByTime(sections),
    // message: sections,
  };
}

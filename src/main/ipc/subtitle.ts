const fs = require('fs');
const { convert } = require('subtitle-converter');

export default function ParseSubtitle(filepath: string) {
  const subtitleText = fs.readFileSync(filepath, 'utf-8');
  const outputExtension = '.vtt'; // conversion is based on output file extension
  const options = {
    removeTextFormatting: true,
    timecodeOverlapLimiter: 1,
  };

  const { subtitle, status } = convert(subtitleText, outputExtension, options);

  if (status.success) {
    console.log('subtitle:', subtitle);
  } else {
    console.log('subtitle status:', status);
  }
}

// function groupSubtitlesByTime(vttContent: string) {
//   const regex =
//     /(\d+\n(\d{2}:\d{2}:\d{2}.\d{3} --> \d{2}:\d{2}:\d{2}.\d{3})\s*(.*))/g;
//   const groups = {};

//   // 使用正则表达式匹配 VTT 文件中的字幕行
//   const match = regex.exec(vttContent);
//   while (match !== null) {
//     const startTime = match[1];
//     const endTime = match[2];
//     const text = match[3];

//     // 根据开始时间创建或获取分组
//     if (!groups[startTime]) {
//       groups[startTime] = [];
//     }

//     // 将字幕文本添加到对应的分组
//     groups[startTime].push({ startTime, endTime, text });
//   }

//   return groups;
// }

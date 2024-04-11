import { useState } from 'react';
import { Channels, Events, MsgStatus } from '../../../types/message';
import './list.css';

function handleClick(): void {
  window.electron.ipcRenderer.sendMessage(
    Channels.IPC,
    Events.DialogOpenSubtitle,
  );
}

const listWrapper = (subtitles: Array<Array<string>>) => {
  if (subtitles.length > 0) {
    const listContent = subtitles.map((val: string[], i: number) => {
      if ([3, 4].indexOf(val.length) > -1) {
        const [start, end] = val[1].split(' --> ');
        const text = val[3] ? [val[2], val[3]] : [val[2]];
        const textWrapper = text.map((textRow: string, index: number) => {
          return <div key={`${val[0]}_${index.toString()}`}>{textRow}</div>;
        });

        const rowCss =
          i > 0
            ? 'subtitle-row flex py-3.5 relative border-t'
            : 'subtitle-row flex py-3.5 relative';

        return (
          <div className={rowCss} key={val[0]}>
            <div className="row-left flex flex-col justify-between gap-y-5 px-4">
              <div className="text-xs text-gray-500">{start}</div>
              <div className="text-xs text-gray-500">{end}</div>
            </div>
            <div className="row-right flex flex-col justify-between gap-y-5 px-4">
              {textWrapper}
            </div>
            <div className="absolute opt top-8 right-4">Play</div>
          </div>
        );
      }

      return null;
    });

    return <div className="overflow-auto">{listContent}</div>;
  }

  return (
    <div className="flex-grow flex items-center justify-center text-xs text-slate-500">
      Please click the button below to select a subtitle file(support: srt,
      ass)!
    </div>
  );
};

export default function List({ index }: { index: number }) {
  const [subtitles, setSubtitles] = useState([]);

  window.electron.ipcRenderer.on(Events.DialogOpenSubtitle, (e) => {
    // eslint-disable-next-line no-console
    if (e.status === MsgStatus.SUCC) {
      setSubtitles(e.message);
    }
  });

  return (
    <div className="border border-slate-200 bg-white text-sm h-full flex flex-col">
      <div className="p-3 border-b border-slate-200">
        <button type="button" className="vll-btn" onClick={handleClick}>
          Select Subtitle
        </button>
        {index}
      </div>
      {listWrapper(subtitles)}
    </div>
  );
}

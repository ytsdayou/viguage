import { useEffect, useRef, useState } from 'react';
// import { ArrowRight } from 'react-bootstrap-icons';
import { Channels, Events, MsgStatus } from '../../../types/message';
import { useAppSelector } from '../../libs/hooks';
import { selectPlayTime } from '../../libs/reducers/playTimeSlice';
import { convertSubtitleTimeToPlayerTime } from '../../libs/tools';
import './List.module.css';

function handleClick(): void {
  window.electron.ipcRenderer.sendMessage(
    Channels.IPC,
    Events.DialogOpenSubtitle,
  );
}

function listenSelectSubtitle(onUpdateSubtitle: (subtitle: []) => void): void {
  window.electron.ipcRenderer.on(Events.DialogOpenSubtitle, (e) => {
    if (e.status === MsgStatus.SUCC) {
      onUpdateSubtitle(e.message);
    }
  });
}

const listWrapper = (
  subtitles: Array<Array<string>>,
  playTime: number,
  activeId: number,
  onUpdateActive: (id: number) => void,
) => {
  const listContent = subtitles.map((val: string[], i: number) => {
    if ([3, 4].indexOf(val.length) > -1) {
      const [start, end] = val[1].split(' --> ');
      const text = val[3] ? [val[2], val[3]] : [val[2]];
      const textWrapper = text.map((textRow: string, index: number) => {
        return <div key={`${val[0]}_${index.toString()}`}>{textRow}</div>;
      });

      const activeFlag =
        playTime > convertSubtitleTimeToPlayerTime(start) &&
        playTime < convertSubtitleTimeToPlayerTime(end);
      if (activeFlag && activeId !== Number(val[0])) {
        onUpdateActive(Number(val[0]));
      }

      let rowCss =
        'subtitle-row flex py-3.5 relative hover:bg-sky-100 group/item';
      let textCss = 'row-right flex flex-col justify-between gap-y-5 px-4';
      if (i > 0) {
        rowCss += ' border-t';
      }
      if (activeFlag) {
        textCss += ' text-blue-600';
      }

      return (
        <div className={rowCss} key={Number(val[0])}>
          <div className="row-left flex flex-col justify-between gap-y-5 px-4">
            <div className="text-xs text-gray-500">{start}</div>
            <div className="text-xs text-gray-500">{end}</div>
          </div>
          <div className={textCss}>{textWrapper}</div>
          <div className="absolute opt top-6 right-6 flex flex-col invisible group-hover/item:visible">
            <span className="bi bi-play-btn">&nbsp;</span>
            <span className="bi bi-repeat">&nbsp;</span>
          </div>
        </div>
      );
    }

    return null;
  });

  return listContent;
};

export default function List() {
  const [subtitles, setSubtitles] = useState([]);
  const [activeId, setActiveId] = useState(0);
  const listRef = useRef<any>(null);
  const playTime = useAppSelector(selectPlayTime);

  const onUpdateActive = (id: number): void => {
    setActiveId(id);
  };

  const onUpdateSubtitle = (sub: []): void => {
    setSubtitles(sub);
  };

  useEffect(() => {
    listenSelectSubtitle(onUpdateSubtitle);
  }, [subtitles]);

  useEffect(() => {
    if (listRef.current && listRef.current.children) {
      const element = listRef.current.children[activeId];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [activeId, listRef]);

  return (
    <div className="border border-slate-200 bg-white text-sm h-full flex flex-col">
      <div className="p-3 border-b border-slate-200">
        <button type="button" className="vll-btn" onClick={handleClick}>
          Select Subtitle
        </button>
      </div>
      {subtitles.length > 0 ? (
        <div ref={listRef} className="overflow-auto">
          {listWrapper(subtitles, playTime, activeId, onUpdateActive)}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center text-xs text-slate-500">
          Please click the button below to select a subtitle file(support: srt,
          ass)!
        </div>
      )}
    </div>
  );
}

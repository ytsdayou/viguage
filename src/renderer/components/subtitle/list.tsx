import { useCallback, useEffect, useRef, useState } from 'react';
import { Channels, Events, MsgStatus } from '../../../types/message';
import { useAppDispatch, useAppSelector } from '../../libs/hooks';
import { selectPlayTime } from '../../libs/reducers/playTimeSlice';
import { convertSubtitleTimeToPlayerTime } from '../../libs/tools';
import { setRepeat } from '../../libs/reducers/repeatSlice';
import { createRepeatProps } from '../../../types/video';
import Switch from '../elements/switch';
import './List.module.css';

function handleClick(): undefined {
  window.electron.ipcRenderer.sendMessage(
    Channels.IPC,
    Events.DialogOpenSubtitle,
  );
}

function listenSelectSubtitle(
  onUpdateSubtitle: (subtitle: []) => undefined,
): undefined {
  window.electron.ipcRenderer.on(Events.DialogOpenSubtitle, (e) => {
    if (e.status === MsgStatus.SUCC) {
      onUpdateSubtitle(e.message);
    }
  });
}

const ListWrapper = (
  subtitles: Array<Array<string>>,
  playTime: number,
  activeId: number,
  onUpdateActive: (id: number) => undefined,
  onUpdateRepeat: (count: number, begin: number, end: number) => void,
) => {
  const listContent = subtitles.map((val: string[], i: number) => {
    if ([4, 5].indexOf(val.length) > -1) {
      const startTime = convertSubtitleTimeToPlayerTime(val[1]);
      const endTime = convertSubtitleTimeToPlayerTime(val[2]);

      const text = val[4] ? [val[3], val[4]] : [val[3]];
      const textWrapper = text.map((textRow: string, index: number) => {
        return <div key={`${val[0]}_${index.toString()}`}>{textRow}</div>;
      });

      const activeFlag = playTime > startTime && playTime < endTime;
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
            <div className="text-xs text-gray-500">{val[1]}</div>
            <div className="text-xs text-gray-500">{val[2]}</div>
          </div>
          <div className={textCss}>{textWrapper}</div>
          <div className="absolute opt top-4 right-6 flex flex-col invisible group-hover/item:visible">
            <button
              type="button"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Play this sentence"
              data-tooltip-place="top"
              className="p-1 rounded-full text-blue-700 hover:bg-gray-200"
              onClick={() => onUpdateRepeat(1, startTime, endTime)}
            >
              <i className="bi bi-play-btn" />
            </button>
            <button
              type="button"
              className="p-1 rounded-full text-blue-700 hover:bg-gray-200"
              title="Repeat this sentence 15 times"
              onClick={() => onUpdateRepeat(15, startTime, endTime)}
            >
              <i className="bi bi-repeat" />
            </button>
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
  const [autoScroll, setAutoScroll] = useState(true);
  const listRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const playTime = useAppSelector(selectPlayTime);

  const onUpdateActive = (id: number): undefined => {
    setActiveId(id);
  };

  const onUpdateSubtitle = (sub: []): undefined => {
    setSubtitles(sub);
  };

  const onUpdateAutoScroll = (): undefined => {
    setAutoScroll(!autoScroll);
  };

  const onUpdateRepeat = useCallback(
    (count: number, startTime: number, endTime: number) => {
      const repeatProps = createRepeatProps(count, startTime, endTime);
      dispatch(setRepeat(repeatProps));
    },
    [dispatch],
  );

  useEffect(() => {
    listenSelectSubtitle(onUpdateSubtitle);
  }, [subtitles]);

  useEffect(() => {
    if (listRef.current && listRef.current.children) {
      const element = listRef.current.children[activeId];
      if (autoScroll && element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [activeId, autoScroll, listRef]);

  return (
    <div className="border border-slate-200 bg-white text-sm h-full flex flex-col">
      <div className="p-3 border-b border-slate-200 flex justify-between items-center">
        <button type="button" className="vll-btn" onClick={handleClick}>
          Select Subtitle
        </button>
        <div className="flex items-center">
          <Switch active={autoScroll} onUpdateActive={onUpdateAutoScroll} />
          <span className="text-gray-600 ml-2">auto scroll</span>
        </div>
      </div>
      {subtitles.length > 0 ? (
        <div ref={listRef} className="overflow-auto">
          {ListWrapper(
            subtitles,
            playTime,
            activeId,
            onUpdateActive,
            onUpdateRepeat,
          )}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center text-xs text-slate-500">
          Please click the button up here to select a subtitle file(support:
          srt)!
        </div>
      )}
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import VideoJS from './videojs';
import { Channels, Events, MsgStatus } from '../../../types/message';
import { useAppDispatch, useAppSelector } from '../../libs/hooks';
import { setPlayTime } from '../../libs/reducers/playTimeSlice';
import { selectRepeat } from '../../libs/reducers/repeatSlice';
// import { RepeatProps } from '../../../types/video';

interface IPlayerProps {
  onUpdateSelect: (selectedValue: boolean) => undefined;
  selectedVideo: boolean;
}

function handleClick(): undefined {
  window.electron.ipcRenderer.sendMessage(Channels.IPC, Events.DialogOpenFile);
}

export default function Player({
  selectedVideo,
  onUpdateSelect,
}: IPlayerProps) {
  const playerRef = useRef<any>(null);
  const [videoJsOptions, setVideoJsOptions] = useState({});
  const dispatch = useAppDispatch();
  const repeat = useAppSelector(selectRepeat);

  // calling IPC exposed from preload script
  window.electron.ipcRenderer.on(Events.DialogOpenFile, (e) => {
    if (e.status === MsgStatus.SUCC) {
      onUpdateSelect(false);
      setVideoJsOptions({
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        seeking: true,
        sources: [
          {
            src: `http://localhost:3000/video?t=${new Date().getTime()}`,
            type: 'video/mp4',
          },
        ],
      });
      dispatch(setPlayTime(0));
      onUpdateSelect(true);
    }
  });

  const handlePlayerReady = useCallback((player: any): undefined => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      // console.log('player is waiting');
    });

    player.on('dispose', () => {
      // console.log('player will dispose');
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (playerRef && playerRef.current && playerRef.current.currentTime) {
        dispatch(setPlayTime(playerRef.current.currentTime()));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const playerBox = () => {
    return selectedVideo ? (
      <VideoJS
        options={videoJsOptions}
        onReady={handlePlayerReady}
        repeat={repeat}
      />
    ) : (
      <div className="w-full aspect-video bg-black text-xs text-white flex items-center justify-center">
        Please click the button below to select a video file!
      </div>
    );
  };

  return (
    <>
      {playerBox()}
      <button type="button" className="vll-btn mt-3" onClick={handleClick}>
        Select Video
      </button>
      {repeat.count}
    </>
  );
}

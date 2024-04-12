import { useEffect, useRef, useState } from 'react';
import VideoJS from './videojs';
import { Channels, Events, MsgStatus } from '../../../types/message';
import { useAppDispatch } from '../../libs/hooks';
import { setPlayTime } from '../../libs/reducers/playTimeSlice';

interface IPlayerProps {
  onUpdateSelect: (selectedValue: boolean) => void;
  selectedVideo: boolean;
}

export default function Player({
  selectedVideo,
  onUpdateSelect,
}: IPlayerProps) {
  const playerRef = useRef<any>(null);
  const [videoJsOptions, setVideoJsOptions] = useState({});
  const dispatch = useAppDispatch();

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

  function handleClick(): void {
    window.electron.ipcRenderer.sendMessage(
      Channels.IPC,
      Events.DialogOpenFile,
    );
  }

  const handlePlayerReady = (player: any): void => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      // console.log('player is waiting');
    });

    player.on('dispose', () => {
      // console.log('player will dispose');
    });

    // player.on('timeupdate', () => {
    //   const currentTime = player.currentTime();

    //   const loopStart = 10; // seconds
    //   const loopEnd = 20; // seconds

    //   if (currentTime < loopStart || currentTime > loopEnd) {
    //     player.currentTime(loopStart);
    //   }
    // });
  };

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
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
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
    </>
  );
}

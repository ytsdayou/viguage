import React, { useEffect, useState } from 'react';
import VideoJS from './videojs';
import { Channels, Events, MsgStatus } from '../../../types/message';
import { useAppDispatch } from '../../libs/hooks';
import { setPlayTime } from '../../libs/reducers/playTimeSlice';
import { setRepeat } from '../../libs/reducers/repeatSlice';

interface IPlayerProps {
  onUpdateSelect: (selectedValue: boolean) => undefined;
  selectedVideo: boolean;
  playerRef: React.MutableRefObject<any>;
}

function handleClick(): undefined {
  window.electron.ipcRenderer.sendMessage(Channels.IPC, Events.DialogOpenFile);
}

export default function Player({
  selectedVideo,
  onUpdateSelect,
  playerRef,
}: IPlayerProps) {
  const [videoJsOptions, setVideoJsOptions] = useState({});
  const dispatch = useAppDispatch();

  const handlePlayerReady = (player: any): undefined => {
    playerRef.current = player;

    player.on('waiting', () => {
      // console.log('player is waiting');
    });

    player.on('dispose', () => {
      // console.log('player will dispose');
    });

    player.on('timeupdate', (e: any) => {
      if (e.manuallyTriggered) {
        dispatch(
          setRepeat({
            count: 0,
            begin: 0,
            end: 0,
          }),
        );
      }
    });
  };

  useEffect(() => {
    // calling IPC exposed from preload script
    window.electron.ipcRenderer.on(Events.DialogOpenFile, (e) => {
      if (e.status === MsgStatus.SUCC) {
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
  }, [dispatch, onUpdateSelect]);

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

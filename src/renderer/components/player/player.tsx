import { useRef } from 'react';
import VideoJS from './videojs';

export default function Player() {
  const playerRef = useRef(null);

  const videoJsOptions = {
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
  };

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

  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />;
}

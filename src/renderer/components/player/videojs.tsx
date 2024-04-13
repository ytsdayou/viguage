import React from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import { VideoProps } from '../../../types/video';

export default function VideoJS(props: VideoProps) {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady, repeat } = props;

  React.useEffect(() => {
    let player: Player;
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      // eslint-disable-next-line no-multi-assign
      player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        // eslint-disable-next-line no-unused-expressions
        onReady && onReady(player);
      });

      // update an existing player
    } else {
      player = playerRef.current;

      player.src(options.sources);
      player.load();
      player.play();
    }

    console.log(repeat);
    player.on('timeupdate', () => {
      const currentTime = player.currentTime();

      if (
        repeat.count > 0 &&
        currentTime &&
        (currentTime < repeat.begin || currentTime > repeat.end)
      ) {
        console.log(currentTime);
        player.currentTime(repeat.begin);
      }
    });
  }, [onReady, options, repeat, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="w-full player-container" data-vjs-player>
      <div className="w-full bg-black" ref={videoRef} />
    </div>
  );
}

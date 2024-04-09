import { useRef } from 'react';
import VideoJS from './videojs';
import { Channels, Events } from '../../../types/message';

interface IPlayerProps {
  onUpdateSelect: (selectedValue: boolean) => void;
  selectedVideo: boolean;
}

function VideoBox(
  selectedVideo: boolean,
  videoJsOptions: any,
  handlePlayerReady: any,
) {
  return selectedVideo ? (
    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
  ) : (
    <div className="w-full aspect-video bg-black">&nbsp;</div>
  );
}

export default function Player({
  selectedVideo,
  onUpdateSelect,
}: IPlayerProps) {
  const playerRef = useRef(null);

  // const [filePath, setFilePath] = useState(null);

  // calling IPC exposed from preload script
  window.electron.ipcRenderer.on(Events.DialogOpenFile, () => {
    // eslint-disable-next-line no-console
    // setFilePath(arg.message);
    onUpdateSelect(true);
  });

  function handleClick(): void {
    window.electron.ipcRenderer.sendMessage(
      Channels.IPC,
      Events.DialogOpenFile,
    );
  }

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

  return (
    <>
      <VideoBox
        selectedVideo={selectedVideo}
        videoJsOptions={videoJsOptions}
        handlePlayerReady={handlePlayerReady}
      />
      <button
        type="button"
        className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
        onClick={handleClick}
      >
        onselect VideoJS
      </button>
    </>
  );
}

import { useRef, useState } from 'react';
import Player from '../components/player/player';
import Subtitle from '../components/subtitle/list';
import Invisible from '../components/player/invisible';

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState(false);
  const playerRef = useRef<any>(null);

  const handleSelectVideo = (flag: boolean): undefined => {
    setSelectedVideo(flag);
  };

  return (
    <div className="w-full flex gap-x-6 h-screen p-4">
      <div className="basis-1/3">
        <Player
          selectedVideo={selectedVideo}
          onUpdateSelect={handleSelectVideo}
          playerRef={playerRef}
        />
        <Invisible playerRef={playerRef} />
      </div>

      <div className="basis-2/3">
        <Subtitle />
      </div>
    </div>
  );
}

import { useState } from 'react';
import Player from '../components/player/player';
import Subtitle from '../components/subtitle/list';

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState(false);

  const handleSelectVideo = (flag: boolean) => {
    setSelectedVideo(flag);
  };

  return (
    <div className="w-full flex gap-x-6 h-screen p-4">
      <div className="basis-1/3">
        <Player
          selectedVideo={selectedVideo}
          onUpdateSelect={handleSelectVideo}
        />
      </div>

      <div className="basis-2/3">
        <Subtitle />
      </div>
    </div>
  );
}

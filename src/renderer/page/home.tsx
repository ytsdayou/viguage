import { useState } from 'react';
import Player from '../components/player/player';
import Subtitle from '../components/subtitle/list';

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState(false);
  const [index, setIndex] = useState(0);

  const handleSelectVideo = (flag: boolean) => {
    setSelectedVideo(flag);
  };

  const handleIndex = () => {
    setIndex(index + 1);
  };

  return (
    <div className="w-full flex gap-x-6 h-screen p-4">
      <div className="basis-1/3">
        <Player
          selectedVideo={selectedVideo}
          onUpdateSelect={handleSelectVideo}
          onUpdateIndex={handleIndex}
        />
      </div>

      <div className="basis-2/3">
        <Subtitle index={index} />
        {index}
      </div>
    </div>
  );
}

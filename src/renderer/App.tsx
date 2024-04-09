// import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/home';
// import { Events, MsgData, Channels } from '../types/message';
import './App.css';
import '../index.css';

// function App() {
//   const [filePath, setFilePath] = useState(null);

//   // calling IPC exposed from preload script
//   window.electron.ipcRenderer.on(Events.DialogOpenFile, (arg: MsgData) => {
//     // eslint-disable-next-line no-console
//     setFilePath(arg.message);
//   });

//   function handleClick(): void {
//     window.electron.ipcRenderer.sendMessage(
//       Channels.IPC,
//       Events.DialogOpenFile,
//     );
//   }

//   return (
//     <div>
//       <button type="button" onClick={handleClick}>
//         select
//       </button>
//       <div>{filePath || ''}</div>

//       <Player />
//     </div>
//   );
// }

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

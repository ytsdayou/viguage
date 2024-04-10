import { Channels, Events } from '../../../types/message';

export default function List() {
  function handleClick(): void {
    window.electron.ipcRenderer.sendMessage(
      Channels.IPC,
      Events.DialogOpenSubtitle,
    );
  }

  window.electron.ipcRenderer.on(Events.DialogOpenSubtitle, (e) => {
    // eslint-disable-next-line no-console
    console.log(e);
  });

  return (
    <div className="text-3xl">
      <div className="font-bold">
        <button
          type="button"
          className="bg-indigo-600 text-white text-xs leading-6 font-medium py-1 px-2 rounded-lg mt-3"
          onClick={handleClick}
        >
          Select Subtitle
        </button>
      </div>
    </div>
  );
}

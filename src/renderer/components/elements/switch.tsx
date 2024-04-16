export default function Switch({
  active,
  onUpdateActive,
}: {
  active: boolean;
  onUpdateActive: () => undefined;
}) {
  let btnClass =
    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ';
  btnClass += active ? 'bg-indigo-600' : 'bg-gray-200';

  let spanClass =
    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out ';
  spanClass += active ? 'translate-x-3.5' : 'translate-x-0';

  return (
    <button
      type="button"
      className={btnClass}
      role="switch"
      aria-checked={active}
      aria-labelledby="switch-label"
      onClick={() => onUpdateActive()}
    >
      <span aria-hidden="true" className={spanClass} />
    </button>
  );
}

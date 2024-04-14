export type RepeatProps = {
  count: number;
  begin: number;
  end: number;
};
export type CallbackObject = {
  [key: string]: (player: any, e: Function) => void;
};
export type VideoProps = {
  options: any;
  onReady: any;
  repeat: RepeatProps;
  playerListener: CallbackObject;
};

export const createRepeatProps = (
  count: number,
  startTime: number,
  endTime: number,
): RepeatProps => {
  return {
    count,
    begin: startTime,
    end: endTime,
  };
};

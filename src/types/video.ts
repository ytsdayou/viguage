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
};

export const createRepeatProps = (
  count: number,
  startTime: number,
  endTime: number,
): RepeatProps => {
  console.log(startTime, endTime);
  return {
    count,
    begin: startTime,
    end: endTime,
  };
};

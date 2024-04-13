export type RepeatProps = {
  count: number;
  begin: number;
  end: number;
};
export type VideoProps = {
  options: any;
  onReady: any;
  repeat: RepeatProps;
};

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../libs/hooks';
import { setPlayTime } from '../../libs/reducers/playTimeSlice';
import { selectRepeat, setRepeat } from '../../libs/reducers/repeatSlice';

export default function Invisible({
  playerRef,
}: {
  playerRef: React.MutableRefObject<any>;
}) {
  const dispatch = useAppDispatch();
  const repeat = useAppSelector(selectRepeat);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (playerRef?.current?.currentTime) {
        const currentTime = playerRef.current.currentTime();
        dispatch(setPlayTime(currentTime));

        if (
          repeat.count > 0 &&
          currentTime &&
          (currentTime < repeat.begin || currentTime > repeat.end)
        ) {
          // console.log(
          //   currentTime,
          //   repeat,
          //   currentTime < repeat.begin || currentTime > repeat.end,
          // );
          playerRef.current.currentTime(repeat.begin);
          dispatch(
            setRepeat({
              count: repeat.count - 1,
              begin: repeat.begin,
              end: repeat.end,
            }),
          );
        }
      }
    }, 200);

    return () => clearInterval(intervalId);
  }, [dispatch, playerRef, repeat]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}

import { createSignal } from 'solid-js';

export const useStopwatch = () => {
  const [time, setAllTime] = createSignal({
    elapsed: 0,
    start: 0,
    paused: 0,
  });
  const setTime = (newTime: Partial<typeof time>) => {
    setAllTime({
      ...time(),
      ...newTime,
    });
  };
  const [isRunning, setIsRunning] = createSignal(false);

  let animationFrameId: number;

  const start = () => {
    setTime({
      start: performance.now() - time().paused,
    });
    setIsRunning(true);
    updateElapsedTime();
  };

  const pause = () => {
    setIsRunning(false);
    setTime({
      paused: performance.now() - time().start,
    });
    // force the animation to update
    cancelAnimationFrame(animationFrameId);
  };

  const reset = () => {
    setTime({
      start: 0,
      paused: 0,
      elapsed: 0,
    });
    setIsRunning(false);
    cancelAnimationFrame(animationFrameId);
  };

  const updateElapsedTime = () => {
    if (isRunning()) {
      setTime({
        elapsed: performance.now() - time().start,
      });
      animationFrameId = requestAnimationFrame(updateElapsedTime);
    }
  };

  const cancelAnimation = () => {
    cancelAnimationFrame(animationFrameId);
  };

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    cancelAnimation,
  };
};

import { type Accessor, createSignal } from 'solid-js';

export interface UseStopwatchReturn {
  time: Accessor<{ elapsed: number; start: number; paused: number }>;
  isRunning: Accessor<boolean>;
  start: () => void;
  pause: () => void;
  reset: () => void;
  cancelAnimation: () => void;
}

export const useStopwatch = (): UseStopwatchReturn => {
  const [time, setAllTime] = createSignal({
    elapsed: 0,
    start: 0,
    paused: 0,
  });
  const setTime = (newTime: Partial<typeof time>): void => {
    setAllTime({
      ...time(),
      ...newTime,
    });
  };
  const [isRunning, setIsRunning] = createSignal(false);

  let animationFrameId: number;

  const start = (): void => {
    setTime({
      start: performance.now() - time().paused,
    });
    setIsRunning(true);
    updateElapsedTime();
  };

  const pause = (): void => {
    setIsRunning(false);
    setTime({
      paused: performance.now() - time().start,
    });
    // force the animation to update
    cancelAnimationFrame(animationFrameId);
  };

  const reset = (): void => {
    setTime({
      start: 0,
      paused: 0,
      elapsed: 0,
    });
    setIsRunning(false);
    cancelAnimationFrame(animationFrameId);
  };

  const updateElapsedTime = (): void => {
    if (isRunning()) {
      setTime({
        elapsed: performance.now() - time().start,
      });
      animationFrameId = requestAnimationFrame(updateElapsedTime);
    }
  };

  const cancelAnimation = (): void => {
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

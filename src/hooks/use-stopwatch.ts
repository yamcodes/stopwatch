import { type Accessor, createSignal, onCleanup, onMount } from 'solid-js';
import { formatTime } from '~/utils';
import Worker from '~/workers/time-worker.ts?worker';

export interface UseStopwatchReturn {
  time: Accessor<{ elapsed: number; start: number; paused: number }>;
  isRunning: Accessor<boolean>;
  start: () => void;
  pause: () => void;
  reset: () => void;
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

  const worker = new Worker();
  let animationFrameId: number;

  /**
   * Update the time every time time-worker sends a tick message,
   * to update the title even while the tab is inactive
   */
  worker.onmessage = () => {
    if (!isRunning()) return;
    setTime({
      elapsed: performance.now() - time().start,
    });
    updateTitle();
  };

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
    updateTitle();
  };

  const updateElapsedTime = (): void => {
    if (!isRunning()) return;
    setTime({
      elapsed: performance.now() - time().start,
    });
    animationFrameId = requestAnimationFrame(updateElapsedTime);
  };

  const updateTitle = (): void => {
    document.title = formatTime(time().elapsed);
  };

  onMount(() => {
    updateTitle();
  });

  onCleanup(() => {
    worker.terminate(); // Terminate worker on cleanup
    cancelAnimationFrame(animationFrameId);
  });

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
  };
};

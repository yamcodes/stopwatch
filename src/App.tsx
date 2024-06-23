import { onMount, type Component, createEffect, onCleanup } from 'solid-js';
import { ButtonWithKey } from './components';
import { formatTime } from './utils';
import { useStopwatch } from './hooks';

/**
 * Key codes for stopwatch ops
 */
const KEYS = {
  START_OR_PAUSE: ' ',
  RESET: 'r',
} as const;

export const App: Component = () => {
  const { time, isRunning, start, pause, reset, cancelAnimation } =
    useStopwatch();

  let timeRef: HTMLParagraphElement;

  const handleResize = () => {
    if (!timeRef) return;
    const parentWidth = timeRef.parentElement?.clientWidth || 0;
    timeRef.style.fontSize = `${parentWidth * 0.228}px`;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key in KEYS) event.preventDefault();
    if (event.key === KEYS.START_OR_PAUSE) isRunning() ? pause() : start();
    if (event.key === KEYS.RESET) reset();
  };

  createEffect(() => {
    document.title = formatTime(time().elapsed);
  });

  onMount(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    // Start the app with the correct text size for the initial screen size
    handleResize();
  });

  onCleanup(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('keydown', handleKeyDown);
    // Cancel the animation frame to prevent memory leaks
    cancelAnimation();
  });

  return (
    <div class="flex flex-col justify-center items-center h-screen">
      <p
        ref={timeRef}
        class="w-full font-bold text-left py-2 whitespace-nowrap transition-all duration-100"
      >
        {formatTime(time().elapsed, { displayMs: true })}
      </p>
      <div class="flex items-center gap-2">
        <ButtonWithKey
          key="Space"
          onClick={() => (isRunning() ? pause() : start())}
        >
          {isRunning() ? 'Pause' : 'Start'}
        </ButtonWithKey>
        <ButtonWithKey key="R" onClick={reset} color="Red">
          Reset
        </ButtonWithKey>
      </div>
    </div>
  );
};

import { onMount, type Component, createEffect, onCleanup } from 'solid-js';
import { ButtonWithKey } from '~/components';
import { formatTime } from '~/utils';
import { useStopwatch } from '~/hooks';
import { KEYS } from '~/consts';

export const App: Component = () => {
  const { time, isRunning, start, pause, reset, cancelAnimation } =
    useStopwatch();

  let timeRef: HTMLParagraphElement | null = null;

  const setTimeRef = (ref: HTMLParagraphElement): void => {
    timeRef = ref;
  };

  const handleResize = (): void => {
    if (!timeRef) return;
    const parentWidth = timeRef.parentElement?.clientWidth ?? 0;
    timeRef.style.fontSize = `${(parentWidth * 0.228).toString()}px`;
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
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
    // Force an inital resize
    handleResize();
  });

  onCleanup(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('keydown', handleKeyDown);
    // Cancel the animation frame to prevent memory leaks
    cancelAnimation();
  });

  return (
    <div class="flex h-screen flex-col items-center justify-center">
      <p
        ref={setTimeRef}
        class="w-full whitespace-nowrap py-2 text-left font-bold transition-all duration-100"
      >
        {formatTime(time().elapsed, { displayMs: true })}
      </p>
      <div class="flex items-center gap-2">
        <ButtonWithKey
          key="Space"
          onClick={() => {
            isRunning() ? pause() : start();
          }}
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
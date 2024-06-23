import {
  createSignal,
  onMount,
  type Component,
  createEffect,
  onCleanup,
} from 'solid-js';
import { ButtonWithKey } from './components';

const KEYS = {
  START_OR_PAUSE: ' ',
  RESET: 'r',
} as const;

const App: Component = () => {
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
  let timeRef: HTMLParagraphElement;

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

  const formatTime = (timeMs: number) => {
    const displayHours = timeMs / 3600000 > 1;
    return new Date(timeMs).toISOString().slice(displayHours ? 11 : 14, 22);
  };

  createEffect(() => {
    document.title = formatTime(time().elapsed);
  });

  onMount(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    // Resize on mount to fit the screen
    handleResize();
  });

  onCleanup(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('keydown', handleKeyDown);
    cancelAnimationFrame(animationFrameId);
  });

  return (
    <>
      <div class="flex flex-col justify-center items-center h-screen">
        <p
          ref={timeRef}
          class="w-full font-bold text-left py-2 whitespace-nowrap transition-all duration-100"
        >
          {formatTime(time().elapsed)}
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
    </>
  );
};

export default App;

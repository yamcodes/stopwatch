import { createSignal, onMount, type Component, createEffect } from 'solid-js';
import { ButtonWithKey } from './components';

type StartOrPause = 'Start' | 'Pause';

const KEYS = {
  START_OR_PAUSE: ' ',
  RESET: 'r',
};

const App: Component = () => {
  // Time (in centiseconds)
  const [timeCs, setTimeCs] = createSignal(0);

  const increment = () => setTimeCs(timeCs() + 1);
  const reset = () => setTimeCs(0);

  // Change the title bar on timeCs changes
  createEffect(() => {
    document.title = formatTimeTitle(timeCs());
  });

  const [startOrPause, setStartOrPause] = createSignal<StartOrPause>('Start');

  let timeRef: HTMLParagraphElement;

  const tick = async () => {
    if (startOrPause() === 'Pause') increment();
    await new Promise((resolve) => setTimeout(resolve, 10));
    tick();
  };

  const handleResize = () => {
    if (!timeRef) return;
    const parentWidth = timeRef.parentElement?.clientWidth || 0;
    timeRef.style.fontSize = `${parentWidth * 0.228}px`;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === KEYS.START_OR_PAUSE) {
      // Prevent a double event in case the button is selected
      event.preventDefault();
      handleStartOrPauseClick();
    }
    if (event.key === KEYS.RESET) {
      event.preventDefault();
      handleResetClick();
    }
  };

  /**
   * Format time to (hh:)mm:ss.cc
   * @param timeCs
   */
  const formatTime = (timeCs: number) => {
    const displayHours = timeCs / 360000 > 1;
    return new Date(timeCs * 10)
      .toISOString()
      .slice(displayHours ? 11 : 14, 22);
  };

  const formatTimeTitle = (timeCs: number) => {
    const displayHours = timeCs / 360000 > 1;
    return new Date(timeCs * 10)
      .toISOString()
      .slice(displayHours ? 11 : 14, 19);
  };

  const handleStartOrPauseClick = () => {
    setStartOrPause(startOrPause() === 'Start' ? 'Pause' : 'Start');
  };

  const handleResetClick = () => {
    reset();
    setStartOrPause('Start');
  };

  onMount(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    tick();
  });

  return (
    <>
      <div class="flex flex-col justify-center items-center h-screen">
        <p
          ref={timeRef}
          class="w-full font-bold text-left py-2 whitespace-nowrap transition-all duration-100"
        >
          {formatTime(timeCs())}
        </p>
        <div class="flex items-center gap-2">
          <ButtonWithKey key="Space" onClick={handleStartOrPauseClick}>
            {startOrPause()}
          </ButtonWithKey>
          <ButtonWithKey key="R" onClick={handleResetClick} color="Red">
            Reset
          </ButtonWithKey>
        </div>
      </div>
    </>
  );
};

export default App;

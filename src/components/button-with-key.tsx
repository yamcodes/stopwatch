import { twJoin } from 'tailwind-merge';
import { type JSX, mergeProps, type ParentProps } from 'solid-js';

export const ButtonColor = {
  Blue: 'Blue',
  Green: 'Green',
  Red: 'Red',
} as const;

export type ButtonWithKeyProps = ParentProps<{
  /**
   * The key to display. This is only use for display purposes, so use free text.
   */
  key: string;
  /**
   * The function to call when the button is clicked
   */
  onClick: () => void;
  /**
   * The class name to apply to the button
   */
  className?: string;
  /**
   * The color of the button, Title Case. Defaults to Blue
   */
  color?: (typeof ButtonColor)[keyof typeof ButtonColor];
}>;

/**
 * @see {@link ButtonColor}
 * @param color - The color of the button
 * @returns The class name to apply to the button
 */
const colorToButtonClass = (
  color: (typeof ButtonColor)[keyof typeof ButtonColor],
): string => {
  switch (color) {
    case ButtonColor.Blue:
      return 'bg-blue-600 hover:bg-blue-500';
    case ButtonColor.Red:
      return 'bg-red-600 hover:bg-red-500';
    case ButtonColor.Green:
      return 'bg-green-600 hover:bg-green-500';
  }
};

/**
 * @see {@link ButtonWithKeyProps}
 * @returns A button with a key and a color
 */
export const ButtonWithKey = (_props: ButtonWithKeyProps): JSX.Element => {
  const props = mergeProps({ color: ButtonColor.Green }, _props);
  return (
    <div class="flex flex-col items-center gap-1">
      <button
        class={twJoin(
          'outline-none text-xl text-white font-bold py-1 px-4 rounded-lg font-outline-2 border-4 border-black border-opacity-15',
          colorToButtonClass(props.color),
        )}
        onClick={props.onClick}
      >
        {props.children}
      </button>
      <span class="text-xs text-white font-bold font-outline-2 opacity-70">
        [{props.key}]
      </span>
    </div>
  );
};

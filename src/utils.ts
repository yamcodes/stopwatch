export interface FormatTimeOptions {
  /**
   * Whether to display milliseconds. If true, the time will be in the format `HH:MM:SS.SSS`.
   * If false or undefined, the time will be in the format `HH:MM:SS`.
   * @defaultValue false
   */
  displayMs?: boolean;
}
/**
 * Format the time in the format `HH:MM:SS`, `HH:MM:SS.SSS`, `MM:SS`, or `MM:SS.SSS`.
 *
 * * Hours are displayed automatically if the time is greater than 1 hour.
 * * Minutes and seconds are always displayed.
 * * Miliseconds can be displayed by setting `options.displayMs` to true.
 *
 * @param timeMs - The time in milliseconds
 * @param options - The options for the format
 * @see {@link FormatTimeOptions}
 * @returns The formatted time
 */
export const formatTime = (
  timeMs: number,
  options?: FormatTimeOptions,
): string => {
  const displayMs = options?.displayMs ?? false;
  const displayHours = timeMs / 3600000 > 1;
  return new Date(timeMs)
    .toISOString()
    .slice(displayHours ? 11 : 14, displayMs ? 22 : 19);
};

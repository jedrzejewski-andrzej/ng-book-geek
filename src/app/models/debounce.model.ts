import { MonoTypeOperatorFunction } from 'rxjs';
import * as RXJSOperators from 'rxjs/operators';

/**
 * This model implements universal debounceTime mechanism that allows us to set a "waiting" time on a pipeable operators
 */
export namespace DebounceModel {
  export const DEFAULT_DEBOUNCE_TIME: number = 500;
  export const debounceTime: <T>(
    time?: number,
  ) => MonoTypeOperatorFunction<T> = (time: number = DEFAULT_DEBOUNCE_TIME) =>
    RXJSOperators.debounceTime(time);
}

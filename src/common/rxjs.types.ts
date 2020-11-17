import { ThrottleConfig } from 'rxjs/internal/operators/throttle';

import { ObservableDefinition } from '../interface/definitions';

export interface FromEventOptions {
  events: string[];
  target: string;
}

export interface TimerOptions {
  initialDelay: number;
  period: number;
}

export interface IntervalOptions {
  period: number;
}

export interface SkipOptions {
  count: number;
}
export interface TakeOptions {
  count: number;
}
export interface TakeLastOptions {
  count: number;
}

export interface ThrottleTimeOptions extends ThrottleConfig {
  duration: number;
}

export type SkipUntilOptions = ObservableDefinition<unknown>;

export type TakeUntilOptions = ObservableDefinition<unknown>;

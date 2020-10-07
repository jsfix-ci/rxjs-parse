import { ThrottleConfig } from 'rxjs/internal/operators/throttle';
import { SourceDefinition } from '../core/types';

export interface FromEventOptions {
  events: string[];
  target: string;
}

export interface TimerOptions {
  initialDelay: number;
  period: number;
}

export interface RangeOptions {
  start?: number;
  count?: number;
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

export type SkipUntilOptions = SourceDefinition<unknown>;

export type TakeUntilOptions = SourceDefinition<unknown>;

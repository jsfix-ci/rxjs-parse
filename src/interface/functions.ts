export interface UnaryFunction<R, T> {
  (arg1: T): R;
}

export interface BinaryFunction<R, T1, T2> {
  (arg1: T1, arg2: T2): R;
}

export type Arg1Fn<R, T1> = UnaryFunction<R, T1>;
export type Arg2Fn<R, T1, T2> = BinaryFunction<R, T1, T2>;
export type Arg3Fn<R, T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => R;

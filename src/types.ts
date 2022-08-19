// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypedPromise<T, F = any> = {
  catch<TResult = never>(
    onrejected?:
      | ((reason: F) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
} & Promise<T>;

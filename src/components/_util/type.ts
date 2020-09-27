export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const tuple = <T extends string[]>(...args: T) => args
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const tupleNum = <T extends number[]>(...args: T) => args

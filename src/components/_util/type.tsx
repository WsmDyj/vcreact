/**
 * 排序对象里的某个key值
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export const tuple = <T extends string[]>(...args: T) => args

export const tupleNum = <T extends number[]>(...args: T) => args

/**
 * 在不执行索引的情况下提取数组/元组的元素类型
 * infer: 表示在 extends 条件语句中待推断的类型变量 infer E: 推断的函数参数
 */
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never

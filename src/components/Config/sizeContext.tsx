import * as React from 'react'

export type SizeType = 'small' | 'middle' | 'large' | undefined

const SizeContext = React.createContext<SizeType>(undefined)

export interface SizeContextProps {
  size?: SizeType
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({ children, size }) => (
  <SizeContext.Consumer>
    {(originSize) => (
      <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>
    )}
  </SizeContext.Consumer>
)

export default SizeContext

// Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性
// Context.Consumer 子组件中对Context的值做改变,这时候就需要用到回调函数
// Context.Provider 对子组件中提供了一个传递数据的方法

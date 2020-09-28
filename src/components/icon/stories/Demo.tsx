import React from 'react'

interface IIconProps {
  /** 图标的 sprite symbolId*/
  icon: string
  /**
   * 图标自定义class
   *
   * @default
   **/
  className?: string
  /**
   * 默认前缀
   *
   * @default 'lg'
   **/
  prefixCls?: string
}

const Demo: React.FC<IIconProps> = () => {
  return <div></div>
}
export default Demo

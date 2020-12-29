import React from 'react'

interface IIconProps {
  /**
   * 提示内容
   **/
  content?: string
  /**
   * 提示类型，可选 info success error warning loading
   * @default info
   **/
  type?: string
  /**
   * 自定义图标
   **/
  icon?: string
  /**
   * 自动关闭的延时，单位秒。设为 0 时不自动关闭
   **/
  duration?: number
  /**
   * 当前提示的唯一标志
   **/
  key?: string | number
  /**
   * 关闭时触发的回调函数
   **/
  onClose?: () => void
}

const Demo: React.FC<IIconProps> = () => {
  return <></>
}
export default Demo

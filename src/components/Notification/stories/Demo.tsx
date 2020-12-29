import React from 'react'

interface IIconProps {
  /**
   * 通知标题
   **/
  title: string
  /**
   * 弹出位置，可选 topLeft | topRight | bottomLeft | bottomRight
   * @default 'topRight'
   **/
  placement?: string
  /**
   * 通知内容
   **/
  description?: string
  /**
   * 通知类型，可选 info success error warning
   * @default info
   **/
  type?: string
  /**
   * 是否显示关闭按钮
   * @default true
   **/
  closable?: boolean
  /**
   * 自定义图标
   **/
  icon?: string
  /**
   * 自动关闭的延时，单位秒。设为 0 时不自动关闭
   * @default 3
   **/
  duration?: number
  /**
   * 消息从顶部弹出时，距离顶部的位置，单位像素
   * @default 24
   **/
  top?: number
  /**
   * 消息从底部弹出时，距离顶部的位置，单位像素
   * @default 24
   **/
  bottom?: number
  /**
   * 关闭时触发的回调函数
   **/
  onClose?: () => void
}

const Demo: React.FC<IIconProps> = () => {
  return <></>
}
export default Demo

import React, { useContext } from 'react'
import RcSwitch from 'rc-switch'
import classNames from 'classnames'
import { ConfigContext } from '../Config'
import SizeContext from '../Config/sizeContext'
import Icon from '../Icon'

export type SwitchSize = 'small' | 'default'
export type SwitchChangeEventHandler = (checked: boolean, event: any) => void
export type SwitchClickEventHandler = SwitchChangeEventHandler

export interface SwitchProps {
  /**
   * 自定义组件类名
   */
  className?: string
  /**
   * 开关大小
   * @default default
   **/
  size?: SwitchSize
  /**
   * 选中时的内容
   */
  checkedChildren?: React.ReactNode
  /**
   * 非选中时的内容
   */
  unCheckedChildren?: React.ReactNode
  /**
   * 是否禁用
   * @default false
   **/
  disabled?: boolean
  /**
   * 加载中的开关
   * @default false
   **/
  loading?: boolean
  /**
   * 初始是否选中
   * @default false
   **/
  defaultChecked?: boolean
  /**
   * 变化时回调函数
   */
  onChange?: SwitchChangeEventHandler
  /**
   * 点击时回调函数
   */
  onClick?: SwitchClickEventHandler
}

const Switch: React.FC<SwitchProps> = ({ size: customizeSize, loading, className, ...props }) => {
  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls('switch')
  const size = useContext(SizeContext)
  const loadingIcon = (
    <div className={`${prefixCls}-handle`}>
      {loading && (
        <span className={`${prefixCls}-loading-icon`}>
          <Icon className="circle-notch" spin />
        </span>
      )}
    </div>
  )
  const classes = classNames(
    {
      [`${prefixCls}-small`]: (customizeSize || size) === 'small'
    },
    className
  )
  return <RcSwitch {...props} loadingIcon={loadingIcon} prefixCls={prefixCls} className={classes} />
}

export default Switch

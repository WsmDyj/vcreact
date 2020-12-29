import React from 'react'
import Motion from 'rc-motion'
import classNames from 'classnames'
import { ConfigContext } from '../Config'
import Icon from '../Icon'

type AlertType = 'info' | 'success' | 'error' | 'warning'

interface AlertProps {
  /**
   * 警告标题
   **/
  title: string
  /**
   * 警告描述
   **/
  description?: string
  /**
   * 指定警告提示的样式
   * @default info
   */
  type?: AlertType
  /**
   * 自定义icon
   */
  icon?: string
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 是否显示辅助图标
   * @default false
   */
  showIcon?: boolean
  /**
   * 是否显示关闭按钮
   * @default false
   */
  closable?: boolean
  /**
   * 自定义关闭按钮
   * @default false
   */
  closeText?: React.ReactNode
  /**
   * 关闭时触发的回调函数
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>
}

const typeToIcon = {
  info: 'exclamation-circle',
  success: 'check-circle',
  error: 'times-circle',
  warning: 'exclamation-triangle'
}

const Alert: React.FC<AlertProps> = ({
  showIcon,
  icon,
  description,
  closable,
  closeText,
  title,
  className,
  ...restProp
}) => {
  const [closed, setClose] = React.useState(false)
  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('alert')
  const type = restProp.type || 'info'
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClose(true)
    restProp.onClose && restProp.onClose(e)
  }
  const renderIcon = (): React.ReactNode => {
    const iconClass = classNames(
      {
        [`${icon}`]: icon,
        [`${typeToIcon[type]}`]: type
      },
      `${prefixCls}-icon`
    )
    return type && <Icon className={iconClass} />
  }
  const isCloseIcon = closeText ? true : closable
  const renderCloseIcon = (): React.ReactNode => {
    return isCloseIcon ? (
      <button type="button" onClick={handleClose} className={`${prefixCls}-close-icon`}>
        {closeText ? (
          <span className={`${prefixCls}-close-text`}>{closeText}</span>
        ) : (
          <Icon className="times anticon-close" />
        )}
      </button>
    ) : null
  }
  const alertCls = classNames(prefixCls, className, `${prefixCls}-${type}`, {
    [`${prefixCls}-with-description`]: description,
    [`${prefixCls}-no-icon`]: !showIcon,
    [`${prefixCls}-closable`]: isCloseIcon
  })
  return (
    <Motion
      visible={!closed}
      motionName={`${prefixCls}-motion`}
      motionLeaveImmediately
      motionAppear={false}
      motionEnter={false}
      onLeaveStart={(node) => ({
        maxHeight: node.offsetHeight
      })}
    >
      {({ className, style }) => (
        <div className={classNames(alertCls, className)} style={style}>
          {showIcon ? renderIcon() : null}
          <span className={`${prefixCls}-message`}>{title}</span>
          <span className={`${prefixCls}-description`}>{description}</span>
          {renderCloseIcon()}
        </div>
      )}
    </Motion>
  )
}
export default Alert

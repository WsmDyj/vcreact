import React from 'react'
import classnames from 'classnames'
import { ConfigContext } from '../Config'
import CheckableTag from './CheckableTag'

export interface BaseTagProps {
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 标签色
   */
  color?: string
  /**
   * 标签是否显示
   * @default false
   */
  visible?: boolean
  /**
   * 设置图标
   */
  icon?: React.ReactDOM
  /**
   * 标签是否可以关闭
   * @default false
   */
  closable?: boolean
  /**
   * 关闭时的回调
   * @default Func
   */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void
  children?: React.ReactDOM
}

const Tag: React.FC<BaseTagProps> = ({
  children,
  className,
  color,
  icon,
  closable,
  ...restProps
}) => {
  const [visible, setVisible] = React.useState(true)
  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('tag')

  const kids = icon ? (
    <>
      {icon}
      <span>{children}</span>
    </>
  ) : (
    <span>{children}</span>
  )

  React.useEffect(() => {
    if ('visible' in restProps) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setVisible(!restProps.visible)
    }
  }, [restProps])

  const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    if (e.defaultPrevented) return
    if (restProps.onClose) {
      restProps.onClose(e)
    }
    if (!('visible' in restProps)) {
      setVisible(false)
    }
  }

  const renderCloseIcon = () => {
    if (closable) {
      return <CheckableTag className={`${prefixCls}-close-icon`} onClick={handleCloseClick} />
    }
  }

  const classes = classnames(prefixCls, className, {
    [`${prefixCls}-${color}`]: color,
    [`${prefixCls}-hidden`]: !visible
  })
  return (
    <span className={classes} {...restProps}>
      {kids}
      {renderCloseIcon()}
    </span>
  )
}

export default Tag

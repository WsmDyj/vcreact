import React, { useContext } from 'react'
import classnames from 'classnames'
import { tuple } from '../_util/type'
import { ConfigContext } from '../Config'

const ButtonSizes = tuple('large', 'middle', 'small')
export type ButtonSize = typeof ButtonSizes[number]

const ButtonShapes = tuple('circle', 'round')
export type ButtonShape = typeof ButtonShapes[number]

const ButtonTypes = tuple('primary', 'default', 'danger', 'link', 'dashed', 'text')
export type ButtonType = typeof ButtonTypes[number]

export interface BaseButtonProps {
  /**
   * 自定义组件类名
   */
  className?: string
  /**
   * 是否为禁用状态
   * @default false
   **/
  disabled?: boolean
  /**
   * icon 图标
   * @default ''
   **/
  icon?: React.ReactDOM
  /**
   * 设置按钮形状
   * @default ''
   **/
  shape?: ButtonShape
  /**
   * 幽灵属性，使按钮背景透明
   * @default false
   **/
  ghost?: boolean
  /**
   * 点击按钮时的回调
   * @default Func
   **/
  onClick?: () => void
  children: React.ReactNode
  /**
   * 按钮尺寸
   * @default 'middle'
   **/
  size?: ButtonSize
  /**
   * 按钮样式
   * @default '''
   **/
  type?: ButtonType
  /**
   * 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
   * @default ''
   **/
  href?: string
  /**
   * 	相当于 a 链接的 target 属性，href 存在时生效
   *  @default ''
   **/
  target?: string
}
export type AnchorButtonProps = {
  href: string
  target?: string
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<unknown>, 'type' | 'onClick'>

export type NativeButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<unknown>, 'type' | 'onClick'>

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const [hasTwoCNChar, setHasTwoCNChar] = React.useState(false)
  const buttonRef = (ref as any) || React.createRef<HTMLElement>()
  const { type, size, ghost, icon, shape, children, className, ...restProps } = props
  // large => lg
  // small => sm
  let sizeCls = ''
  switch (size) {
    case 'large':
      sizeCls = 'lg'
      break
    case 'small':
      sizeCls = 'sm'
      break
    default:
      break
  }

  React.useEffect(() => {
    const fixTwoCNChar = () => {
      const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/
      const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)
      const buttonText = buttonRef.current.textContent
      if (isTwoCNChar(buttonText)) {
        if (!hasTwoCNChar) {
          setHasTwoCNChar(true)
        }
      } else if (hasTwoCNChar) {
        setHasTwoCNChar(false)
      }
    }
    fixTwoCNChar()
  }, [hasTwoCNChar, buttonRef])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props
    if (onClick) {
      ;(onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e)
    }
  }
  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls('btn')
  const classes = classnames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-icon-only`]: icon && !children,
    [`${prefixCls}-background-ghost`]: ghost,
    [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar,
    [`${prefixCls}-${sizeCls}`]: sizeCls
  })
  const iconNode = icon ? icon : null
  const kids = children ? <span>{children}</span> : null

  const linkButtonRestProps = restProps as AnchorButtonProps
  if (linkButtonRestProps.href !== undefined) {
    return (
      <a ref={buttonRef} className={classes} {...linkButtonRestProps} {...restProps}>
        {iconNode}
        {kids}
      </a>
    )
  }
  return (
    <button ref={buttonRef} onClick={handleClick} className={classes} {...restProps}>
      {iconNode}
      {kids}
    </button>
  )
}

/*
 * Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧
 * React.forwardRef 来获取传递给它的 ref, 然后转发获取到它渲染的 DOM button
 * 1、调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。
 * 2、React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
 * 3、我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
 * 4、当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。
 */
const Button = React.forwardRef<unknown, ButtonProps>(InternalButton)

export default Button

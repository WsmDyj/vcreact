import React from 'react'
import classnames from 'classnames'
import { tuple } from '../_util/type'


const ButtonSize = tuple("medium", "small")
export type ButtonSize = (typeof ButtonSize)[number]
const ButtonType = tuple('primary', 'default', 'danger', 'link')
export type ButtonType = (typeof ButtonType)[number]

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  type?: ButtonType
  children: React.ReactNode
  href?: string
}

export type AnchorButtonProps = {
  href: string
  target?: string
  onClick?: React.MouseEventHandler<any>
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type'>

export type NativeButtonProps = {
  onClick?: React.MouseEventHandler<any>
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type'>

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type,
    size,
    disabled,
    children,
    href,
    className,
    ...restProps
  } = props

  const classes = classnames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disable: type === 'link' && disabled,
  })

  if (type === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

export default Button
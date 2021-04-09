import * as React from 'react'
import { SizeType } from '../Config/sizeContext'

export interface AbstractCheckboxGroupProps {
  prefixCls?: string
  className?: string
  defaultChecked?: boolean
  checked?: boolean
  style?: React.CSSProperties
  disabled?: boolean
  onChange?: (e: any) => void
  onClick?: React.MouseEventHandler<HTMLElement>
  onMouseEnter?: React.MouseEventHandler<HTMLElement>
  onMouseLeave?: React.MouseEventHandler<HTMLElement>
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>
  value?: any
  tabIndex?: number
  name?: string
  children?: React.ReactNode
  id?: string
  autoFocus?: boolean
  type?: string
}

export interface RadioGroupProps extends AbstractCheckboxGroupProps {
  defaultValue?: any
  value?: any
  onChange?: (e: RadioChangeEvent) => void
  size?: SizeType
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
  name?: string
  children?: React.ReactNode
  id?: string
}

export interface RadioChangeEvent {
  target: any
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: MouseEvent
}

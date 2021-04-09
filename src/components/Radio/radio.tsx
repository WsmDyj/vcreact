import * as React from 'react'
import RcCheckbox from 'rc-checkbox'
// import classNames from 'classnames'
import { ConfigContext } from '../Config'

export interface RadioProps {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  defaultChecked?: boolean
  value: any
  id?: string
  checked: boolean
  onChange?: (e: any) => void
}

export interface RadioChangeEvent {
  target: RadioProps
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: MouseEvent
}

const Radio: React.FC<RadioProps> = (props) => {
  const { className, children, ...radioProps } = props
  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('radio')
  return (
    <label>
      <RcCheckbox prefixCls={prefixCls} {...radioProps} />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  )
}

export default Radio

import * as React from 'react'
import VcCheckbox from './VcCheckbox'
import classNames from 'classnames'
import { ConfigContext } from '../Config'
import { GroupContext } from './CheckboxGroup'

export interface CheckboxProps {
  /**
   * 自定义组件类名
   */
  className?: string
  /**
   * 是否禁用
   * @default false
   **/
  disabled?: boolean
  /**
   * 默认选择
   * @default false
   **/
  defaultChecked?: boolean
  /**
   * 指定当前是否选中
   */
  checked?: boolean
  /**
   * 文字按钮
   */
  fontStyle?: boolean
  /**
   * 变化时回调函数
   */
  onChange?: (e: any) => void
  children?: React.ReactNode
  value?: any
  name?: string
  id?: string
  indeterminate?: boolean
}

// export interface CheckboxChangeEvent {
//   target: CheckboxProps
//   stopPropagation: () => void
//   preventDefault: () => void
//   nativeEvent: MouseEvent // nativeEvent获取windows的事件处理
// }

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { children, indeterminate, fontStyle, ...restProps } = props
  const saveCheckbox = React.useRef<any>(null)
  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('checkbox')
  const checkboxGroup = React.useContext(GroupContext)
  const checkboxProps: CheckboxProps = { ...restProps }
  if (checkboxGroup) {
    checkboxProps.onChange = (...args) => {
      if (restProps.onChange) {
        restProps.onChange(...args)
      }
      checkboxGroup.toggleOption({ label: children, value: checkboxProps.value })
    }
  }

  const checkboxClass = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate
  })
  const classString = classNames({
    [`${prefixCls}-wrapper`]: true,
    [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
    [`${prefixCls}-font`]: fontStyle
  })

  return (
    <label className={classString}>
      <VcCheckbox
        ref={saveCheckbox}
        {...checkboxProps}
        prefixCls={prefixCls}
        className={checkboxClass}
      >
        {fontStyle && <span>{children}</span>}
      </VcCheckbox>
      {children && !fontStyle && <span>{children}</span>}
    </label>
  )
}

export default Checkbox

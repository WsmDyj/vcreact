import * as React from 'react'
import RcCheckbox from './checkbox'
import classNames from 'classnames'
import { ConfigContext } from '../Config'

export interface CheckboxProps {
  /**
   * 自定义组件类名
   */
  className?: string
  children?: React.ReactNode
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
   * 设置 indeterminate 状态，只负责样式控制
   * @default false
   **/
  indeterminate?: boolean
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
  onChange?: (e: Event) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ children, indeterminate, fontStyle, ...props }) => {
  const saveCheckbox = React.useRef<any>(null)
  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('checkbox')
  const checkboxClass = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate
  })
  const classString = classNames({
    [`${prefixCls}-wrapper`]: true,
    [`${prefixCls}-font`]: fontStyle
  })
  // React.useEffect(() => {
  //   document.getElementsByClassName('vc-checkbox-font').forEach((element) => {
  //     element.children[0].children[1].innerHTML = children
  //   })
  //   return () => {
  //     document.getElementsByClassName('vc-checkbox-font').forEach((element) => {
  //       element.children[0].children[1].innerHTML = ''
  //     })
  //   }
  // }, [fontStyle])
  return (
    <label className={classString}>
      <RcCheckbox ref={saveCheckbox} {...props} prefixCls={prefixCls} className={checkboxClass}>
        {fontStyle && <span>{children}</span>}
      </RcCheckbox>
      {children && !fontStyle && <span>{children}</span>}
    </label>
  )
}

export default Checkbox

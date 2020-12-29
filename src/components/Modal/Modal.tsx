import React from 'react'
import Dialog from 'rc-dialog'
import { ConfigContext } from '../Config'
import Button, { ButtonType, ButtonProps } from '../Button'
import Icon from '../Icon'

export interface ModalProps {
  /** 标题 */
  title?: React.ReactNode | string
  /** 内容 */
  children?: React.ReactNode
  /** 对话框内容 */
  content?: React.ReactNode
  /** 对话框是否可见 */
  visible?: boolean
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean
  prefixCls?: string
  /** 自定义图标 */
  icon?: React.ReactNode
  /** 是否展示取消按钮
   * @default true
   */
  okCancel?: boolean
  /** 确认按钮类型 */
  okType?: ButtonType
  /** 自定义类名 */
  className?: string
  /** 宽度
   * @default 520
   */
  width?: number
  maskTransitionName?: string
  transitionName?: string
  closeIcon?: React.ReactNode
  /** 自定义页脚 */
  footer?: React.ReactNode
  /** 确认按钮文字 */
  okText?: React.ReactNode
  /** 取消按钮文字 */
  cancelText?: React.ReactNode
  /** 点击模态框右上角叉、取消按钮 */
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void
  /** 点击确定回调 */
  onOk?: (e: React.MouseEvent<HTMLElement>) => void
  /** 确定按钮样式 */
  okButtonProps?: ButtonProps
  /** 取消按钮样式 */
  cancelButtonProps?: ButtonProps
}

export interface ModalLocale {
  cancelText: string
  okText: string
}

const Modal: React.FC<ModalProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('modal')

  const { visible, footer, children, closeIcon, ...restProps } = props
  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    const { onCancel } = props
    if (onCancel) {
      onCancel(e)
    }
  }
  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props
    if (onOk) {
      onOk(e)
    }
  }
  const renderFooter = (locale: ModalLocale) => {
    const { cancelText, okText } = props
    return (
      <>
        <Button onClick={() => handleCancel}>{cancelText || locale.cancelText}</Button>
        <Button onClick={() => handleOk} type="primary">
          {okText || locale.okText}
        </Button>
      </>
    )
  }
  const closeIconToRender = (
    <span className={`${prefixCls}-close-x`}>{closeIcon || <Icon className="times" />}</span>
  )
  const defaultFooter = renderFooter({ cancelText: '取消', okText: '确定' })
  return (
    <Dialog
      footer={footer === undefined ? defaultFooter : footer}
      {...restProps}
      visible={visible}
      prefixCls={prefixCls}
      onClose={handleCancel}
      closeIcon={closeIconToRender}
    >
      {children}
    </Dialog>
  )
}

// Module.info = function infoFn(props: ModuleProps) {
//   return confirm(withInfo(props))
// }
Modal.defaultProps = {
  width: 520,
  transitionName: 'zoom',
  maskTransitionName: 'fade',
  visible: false
}
export default Modal

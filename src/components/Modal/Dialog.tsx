import * as React from 'react'
import classNames from 'classnames'
import Dialog from './Modal'
import ActionButton from './ActionButton'
import { ConfigUpdate } from './Confirm'

interface DialogProps extends ConfigUpdate {
  close: (...args: any[]) => void
}

const confirm = (props: DialogProps) => {
  const {
    onCancel,
    onOk,
    close,
    icon,
    cancelButtonProps,
    okButtonProps,
    visible,
    okText,
    cancelText
  } = props
  const prefixCls = 'vc-modal'
  const okType = props.okType || 'primary'
  const contentPrefixCls = `${prefixCls}-confirm`
  const width = props.width || 416
  const classString = classNames(
    contentPrefixCls,
    `${contentPrefixCls}-${props.type}`,
    props.className
  )
  const okCancel = 'okCancel' in props ? props.okCancel : true
  const cancelButton = okCancel && (
    <ActionButton closeModal={close} actionFn={onCancel} buttonProps={cancelButtonProps}>
      {cancelText}
    </ActionButton>
  )
  return (
    <Dialog
      className={classString}
      onCancel={() => close({ triggerCancel: true })}
      visible={visible}
      width={width}
      footer=""
    >
      <div className={`${contentPrefixCls}-body-wrapper`}>
        <div className={`${contentPrefixCls}-body`}>
          {icon}
          {props.title === undefined ? null : (
            <span className={`${contentPrefixCls}-title`}>{props.title}</span>
          )}
          <div className={`${contentPrefixCls}-content`}>{props.content}</div>
        </div>
        <div className={`${contentPrefixCls}-btns`}>
          {cancelButton}
          <ActionButton
            closeModal={close}
            actionFn={onOk}
            buttonProps={okButtonProps}
            type={okType}
          >
            {okText}
          </ActionButton>
        </div>
      </div>
    </Dialog>
  )
}

export default confirm

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Dialog from './Dialog'
import { ModalProps } from './Modal'
import Icon from '../Icon'

export const destroyFns: Array<() => void> = []

export type ConfigUpdate = ModalProps & { type: string }

export type ModalFunc = (props: ModalProps) => void

export interface ModalStaticFunctions {
  confirm: ModalFunc
  info: ModalFunc
  success: ModalFunc
  error: ModalFunc
  warning: ModalFunc
}

export default function confirm(config: ModalProps) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  let currentConfig = { ...config, close, visible: true } as any

  const render = ({ okText, cancelText, ...props }: any) => {
    ReactDOM.render(
      <Dialog cancelText={cancelText || '取消'} okText={okText || '确定'} {...props} />,
      div
    )
  }
  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }
  function close(this: any, ...args: any[]) {
    destroy()
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: destroy.bind(this, ...args)
    }
    render(currentConfig)
  }
  render(currentConfig)

  destroyFns.push(close)
}

export function withConfirm(props: ModalProps): ConfigUpdate {
  return {
    type: 'confirm',
    ...props
  }
}

export function widthInfo(props: ModalProps): ConfigUpdate {
  return {
    type: 'info',
    icon: <Icon className="exclamation-circle" />,
    okCancel: false,
    ...props
  }
}

export function widthSuccess(props: ModalProps): ConfigUpdate {
  return {
    type: 'success',
    icon: <Icon className="check-circle" />,
    okCancel: false,
    ...props
  }
}

export function widthError(props: ModalProps): ConfigUpdate {
  return {
    type: 'error',
    icon: <Icon className="times-circle" />,
    okCancel: false,
    ...props
  }
}

export function widthWarning(props: ModalProps): ConfigUpdate {
  return {
    type: 'warning',
    icon: <Icon className="exclamation-triangle" />,
    okCancel: false,
    ...props
  }
}

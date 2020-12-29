import React from 'react'
import Button, { ButtonProps, ButtonType } from '../Button'

export interface ActionButtonProps {
  type?: ButtonType
  buttonProps?: ButtonProps
  closeModal: Function
  actionFn?: (...args: any[]) => any | PromiseLike<any>
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { children, buttonProps } = props
  const clickedRef = React.useRef<boolean>(false)

  const handlePromiseOnOk = (returnValueOfOnOk?: PromiseLike<any>) => {
    const { closeModal } = props
    if (!returnValueOfOnOk || !returnValueOfOnOk.then) {
      return
    }
    returnValueOfOnOk.then(
      (...args: any[]) => {
        closeModal(...args)
      },
      (e: Error) => {
        console.error(e)
        clickedRef.current = false
      }
    )
  }

  const onClick = () => {
    const { actionFn, closeModal } = props
    if (clickedRef.current) {
      return
    }
    clickedRef.current = true
    if (!actionFn) {
      closeModal()
      return
    }
    let returnValueOfOnOk
    if (actionFn.length) {
      returnValueOfOnOk = actionFn(closeModal)
      clickedRef.current = false
    } else {
      returnValueOfOnOk = actionFn()
      if (!returnValueOfOnOk) {
        closeModal()
        return
      }
    }
    handlePromiseOnOk(returnValueOfOnOk)
  }

  return (
    <Button type={props.type} onClick={onClick} {...buttonProps}>
      {children}
    </Button>
  )
}

export default ActionButton

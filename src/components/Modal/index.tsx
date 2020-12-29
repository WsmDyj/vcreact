import OriginModal, { ModalProps } from './Modal'
import confirm, {
  ModalStaticFunctions,
  withConfirm,
  widthInfo,
  widthSuccess,
  widthError,
  widthWarning
} from './Confirm'

// const Modal = (OriginModal as unknown) as ModalStaticFunctions

type ModalType = typeof OriginModal & ModalStaticFunctions

const Modal = OriginModal as ModalType

Modal.confirm = function confirmFn(props: ModalProps) {
  return confirm(withConfirm(props))
}
Modal.info = function infoFn(props: ModalProps) {
  return confirm(widthInfo(props))
}
Modal.success = function successFn(props: ModalProps) {
  return confirm(widthSuccess(props))
}
Modal.error = function errorFn(props: ModalProps) {
  return confirm(widthError(props))
}
Modal.warning = function warningFn(props: ModalProps) {
  return confirm(widthWarning(props))
}

export default Modal

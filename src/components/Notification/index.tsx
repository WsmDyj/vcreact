import * as React from 'react'
import RCNotification from 'rc-notification'
import Icon from '../Icon'
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent
} from 'rc-notification/lib/Notification'

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRiget'
const defaultPrefixCls = 'vc-notification'
const defaultDuration = 3
const defaultTop = 24
const defaultBottom = 24
const defaultClosable = true
const defaultPlacement: NotificationPlacement = 'topRight'
const messageInstance: {
  [key: string]: Promise<RCNotificationInstance>
} = {}

type NoticeType = 'info' | 'success' | 'error' | 'warning'
// export type PresetNoticeType = ElementOf<typeof NoticeType>
// const PresetNoticeRegex = new RegExp(`^(${NoticeType.join('|')})$`)

const typeToIcon = {
  info: 'exclamation-circle',
  success: 'check-circle',
  error: 'times-circle',
  warning: 'exclamation-triangle'
}

export interface ArgsProps {
  title: React.ReactNode
  type: NoticeType
  description?: React.ReactDOM
  placement?: NotificationPlacement
  top?: number
  bottom?: number
  closable?: boolean
  icon?: string
  prefixCls?: string
  duration?: number | null
  onClose?: () => void
}

function getPlacementStyle(
  placement: NotificationPlacement,
  top: number = defaultTop,
  bottom: number = defaultBottom
) {
  let style
  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top,
        bottom: 'auto'
      }
      break
    case 'topRight':
      style = {
        right: 0,
        top,
        bottom: 'auto'
      }
      break
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom
      }
      break
    default:
      style = {
        right: 0,
        top: 'auto',
        bottom
      }
      break
  }
  return style
}

function getRCNoticeProps(args: ArgsProps, prefixCls: string): NoticeContent {
  const duration = args.duration !== undefined ? args.duration : defaultDuration
  const iconClass = args.icon || typeToIcon[args.type]
  const iconNode: React.ReactNode = args.type && (
    <Icon className={`${iconClass} ${prefixCls}-icon ${prefixCls}-icon-${args.type}`} />
  )
  const closable = args.closable !== undefined ? args.closable : defaultClosable
  return {
    duration,
    closable,
    content: (
      <div className={iconNode ? `${prefixCls}-with-icon` : ''}>
        {iconNode}
        <div className={`${prefixCls}-message`}>{args.title}</div>
        <div className={`${prefixCls}-description`}>{args.description}</div>
      </div>
    ),
    onClose: args.onClose
  }
}

function getNotificationInstance(
  args: ArgsProps,
  callback: (info: { prefixCls: string; instance: RCNotificationInstance }) => void
) {
  const { placement = defaultPlacement, top, bottom } = args
  const outPrefixCls = args.prefixCls || defaultPrefixCls
  const prefixCls = `${outPrefixCls}-notice`
  const cacheKey = `${outPrefixCls}-${placement}`
  const cacheInstance = messageInstance[cacheKey]

  if (cacheInstance) {
    Promise.resolve(cacheInstance).then((instance) => {
      callback({
        prefixCls,
        instance: instance
      })
    })
    return
  }
  const closeIconToRender = <Icon className={`${outPrefixCls}-close-x`} icon="times" />
  messageInstance[cacheKey] = new Promise((resolve) => {
    RCNotification.newInstance(
      {
        prefixCls: outPrefixCls,
        style: getPlacementStyle(placement, top, bottom),
        closeIcon: closeIconToRender
      },
      (notification) => {
        resolve(notification)
        callback({
          prefixCls,
          instance: notification
        })
      }
    )
  })
}

function notice(args: ArgsProps) {
  getNotificationInstance(args, ({ prefixCls, instance }) => {
    instance.notice(getRCNoticeProps(args, prefixCls))
  })
}

const api: any = {
  open: notice
}
export interface NotificationApi {
  open(args: ArgsProps): void
  success(args: ArgsProps): void
  info(args: ArgsProps): void
  warning(args: ArgsProps): void
  error(args: ArgsProps): void
}

;['success', 'info', 'warning', 'error'].forEach((type) => {
  api[type] = (args: ArgsProps) => {
    api.open({
      ...args,
      type
    })
  }
})

export default api as NotificationApi

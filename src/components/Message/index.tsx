import * as React from 'react'
import classNames from 'classnames'
import RCNotification from 'rc-notification'
import Icon from '../Icon'
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent
} from 'rc-notification/lib/Notification'

const transitionName = 'move-up'
const localPrefixCls = 'vc-message'
let key = 1
const defaultDuration = 3
let defaultTop: number
let maxCount: number
let messageInstance: RCNotificationInstance

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading'
// export type PresetNoticeType = ElementOf<typeof NoticeType>
// const PresetNoticeRegex = new RegExp(`^(${NoticeType.join('|')})$`)

const typeToIcon = {
  info: 'exclamation-circle',
  success: 'check-circle',
  error: 'times-circle',
  warning: 'exclamation-triangle',
  loading: 'spinner'
}

export interface ArgsProps {
  content: React.ReactNode
  type: NoticeType
  icon?: string
  prefixCls?: string
  duration?: number | null
  key?: string | number
  onClose?: () => void
}

function getRCNoticeProps(args: ArgsProps, prefixCls: string): NoticeContent {
  const duration = args.duration !== undefined ? args.duration : defaultDuration
  const iconClass = args.icon || typeToIcon[args.type]
  const isIconPulse = args.type && args.type === 'loading' ? true : false
  const messageClass = classNames(`${prefixCls}-custom-content`, {
    [`${prefixCls}-${args.type}`]: args.type
  })
  return {
    duration,
    key: args.key,
    content: (
      <div className={messageClass}>
        {args.type && <Icon pulse={isIconPulse} className={iconClass} />}
        <span>{args.content}</span>
      </div>
    ),
    onClose: args.onClose
  }
}

function getRCNotificationInstance(
  args: ArgsProps,
  callback: (info: { instance: RCNotificationInstance; prefixCls: string }) => void
) {
  const prefixCls = args.prefixCls || localPrefixCls
  if (messageInstance) {
    callback({
      prefixCls,
      instance: messageInstance
    })
    return
  }
  RCNotification.newInstance(
    {
      prefixCls,
      transitionName,
      style: { top: defaultTop },
      maxCount
    },
    (instance: any) => {
      if (messageInstance) {
        callback({
          prefixCls,
          instance: messageInstance
        })
        return
      }
      messageInstance = instance
      callback({
        prefixCls,
        instance: messageInstance
      })
    }
  )
}

function notice(args: ArgsProps) {
  const target = args.key || key++
  getRCNotificationInstance(args, ({ prefixCls, instance }) => {
    instance.notice(getRCNoticeProps({ ...args, key: target }, prefixCls))
  })
}

const api: any = {
  open: notice
}
export interface MessageApi {
  open(args: ArgsProps): void
}

;['info', 'success', 'error', 'waring', 'loading'].forEach((type) => {
  api[type] = (args: ArgsProps) => {
    api.open({
      ...args,
      type
    })
  }
})

export default api as MessageApi

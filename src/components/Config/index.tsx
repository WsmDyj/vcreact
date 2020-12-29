import * as React from 'react'
import { ConfigConsumer, ConfigContext, ConfigConsumerProps } from './context'

export interface ConfigProviderProps {
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  prefixCls?: string
  children?: React.ReactNode
}
class ConfigProvider extends React.Component<ConfigProviderProps> {
  getPrefixClsWrapper = (context: ConfigConsumerProps) => {
    return (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls } = this.props

      if (customizePrefixCls) return customizePrefixCls

      const mergedPrefixCls = prefixCls || context.getPrefixCls('')

      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls
    }
  }

  renderProvider = (context: ConfigConsumerProps) => {
    const { children } = this.props

    const config: ConfigConsumerProps = {
      ...context,
      getPrefixCls: this.getPrefixClsWrapper(context)
    }
    const childNode = children
    return <ConfigContext.Provider value={config}>{childNode}</ConfigContext.Provider>
  }

  render() {
    return <ConfigConsumer>{this.renderProvider}</ConfigConsumer>
  }
}
export { ConfigProvider, ConfigContext, ConfigConsumer }

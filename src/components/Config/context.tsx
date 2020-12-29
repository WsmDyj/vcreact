import * as React from 'react'

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string
}

const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls
    return suffixCls ? `vc-${suffixCls}` : 'vc'
  }
})

const ConfigConsumer = ConfigContext.Consumer

export { ConfigContext, ConfigConsumer }

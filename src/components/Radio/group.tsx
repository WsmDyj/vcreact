import * as React from 'react'
import classNames from 'classnames'
import { RadioGroupProps } from './interface'
import { ConfigContext } from '../Config'

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext)
  const groupPrefixCls = getPrefixCls('radio-group')
  const { children, id } = props
  const classString = classNames(groupPrefixCls)
  return (
    <div id={id} className={classString}>
      {children}
    </div>
  )
}

export default React.memo(RadioGroup)

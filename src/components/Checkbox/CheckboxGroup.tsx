import * as React from 'react'
import classNames from 'classnames'
import Checkbox from './index'
import { ConfigContext } from '../Config'

export type CheckboxValueType = string | number | boolean

export interface CheckboxOptionType {
  label: React.ReactNode
  value: CheckboxValueType
}
export interface CheckboxGroupProps {
  className?: string
  options?: Array<CheckboxOptionType | string>
  value?: Array<CheckboxValueType>
  defaultValue?: Array<CheckboxValueType>
  disabled?: boolean
  onChange?: (checkedValue: Array<CheckboxValueType>) => void
  children?: React.ReactNode
}

export interface CheckboxGroupContext {
  toggleOption: (option: CheckboxOptionType) => void
  value?: any
}

export const GroupContext = React.createContext<CheckboxGroupContext | null>(null)

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  options = [],
  defaultValue,
  className,
  onChange,
  ...restProps
}) => {
  const [value, setValue] = React.useState<CheckboxValueType[]>(
    restProps.value || defaultValue || []
  )
  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('checkbox')
  const groupPrefixCls = `${prefixCls}-group`

  React.useEffect(() => {
    if ('value' in restProps) {
      setValue(restProps.value || [])
    }
  }, [restProps])

  const getOptions = () => {
    return options.map((option) => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option
        }
      }
      return option
    })
  }
  const toggleOption = (option: CheckboxOptionType) => {
    const optionIndex = value.indexOf(option.value)
    const newValue = [...value]
    if (optionIndex === -1) {
      newValue.push(option.value)
    } else {
      newValue.splice(optionIndex, 1)
    }
    if (!('value' in restProps)) {
      setValue(newValue)
    }
    if (onChange) {
      const opts = getOptions()
      onChange(
        newValue.sort((a, b) => {
          const indexA = opts.findIndex((opt) => opt.value === a)
          const indexB = opts.findIndex((opt) => opt.value === b)
          return indexA - indexB
        })
      )
    }
  }

  if (options && options.length > 0) {
    children = getOptions().map((option: any) => (
      <Checkbox
        checked={value.indexOf(option.value) !== -1}
        onChange={option.onChange}
        value={option.value}
        disabled={'disabled' in option ? option.disabled : restProps.disabled}
        key={option.value.toString()}
      >
        {option.label}
      </Checkbox>
    ))
  }

  const context = {
    toggleOption,
    value,
    disabled: restProps.disabled
  }
  return (
    <div className={classNames(groupPrefixCls)}>
      <GroupContext.Provider value={context}>{children}</GroupContext.Provider>
    </div>
  )
}

export default React.memo(CheckboxGroup)

import * as React from 'react'
import { CheckboxGroup } from '../index'

const demo: React.FC<{}> = () => {
  const options = [
    { label: 'Apple', value: '1' },
    { label: 'Pear', value: '2' },
    { label: 'Orange', value: '3', disabled: true },
    { label: 'banana', value: '4', disabled: true }
  ]
  const onChange = (checkedValues: any) => {
    console.log('checked = ', checkedValues)
  }
  return (
    <div>
      <CheckboxGroup onChange={onChange} defaultValue={['3']} options={options}></CheckboxGroup>
    </div>
  )
}
export default demo

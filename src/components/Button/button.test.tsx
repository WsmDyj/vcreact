import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './Button'

const defaultProps = {
  onClick: jest.fn()
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element.tagName).toEqual('BUTTON')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
})

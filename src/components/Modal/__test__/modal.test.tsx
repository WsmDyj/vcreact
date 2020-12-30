import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Modal from '../index'

const defaultProps = {
  onClick: jest.fn()
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Modal visible>Some contents...</Modal>)
  })
})

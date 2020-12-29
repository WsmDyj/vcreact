import React from 'react'
import Icon from '../Icon'

export interface CheckableTagProps {
  className?: string
  prefixCls?: string
  onClick?: (e: React.MouseEvent<HTMLSelectElement, MouseEvent>) => void
}

const CheckableTag: React.FC<CheckableTagProps> = ({ className, onClick, ...restProp }) => {
  const handleClick = (e: React.MouseEvent<HTMLSelectElement, MouseEvent>) => {
    if (onClick) {
      onClick(e)
    }
  }
  return (
    <span className={className} onClick={handleClick}>
      <Icon className={className} {...restProp} icon="times" />
    </span>
  )
}

export default CheckableTag

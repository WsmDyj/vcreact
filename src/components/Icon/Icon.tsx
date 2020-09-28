import React from 'react'
import classNames from 'classnames'
import { tuple } from '../_util/type'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
library.add(fas)

const ThemeProps = tuple('primary', 'default', 'danger', 'link')
export type ThemeProp = typeof ThemeProps[number]

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProp | string
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props
  const classes = classNames('vc-icon', className, {
    [`icon-${theme}`]: theme
  })
  return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon

import React from 'react'
import {
  library,
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import classnames from 'classnames'
import { IconName } from '@fortawesome/fontawesome-common-types/index'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
library.add(fas)

export interface IconProps {
  /**
   * 图标类名
   */
  className: string
  /**
   * 图标大小
   **/
  size?: 'xs' | 'lg' | 'sm' | '1x' | '2x'
  /**
   * 图标旋转角度
   **/
  rotation?: 90 | 180 | 270 | undefined
}

const Icon: React.FC<IconProps | FontAwesomeIconProps> = ({
  className,
  size,
  rotation,
  ...restProps
}) => {
  const iconClassArray: string[] = className ? className?.split(' ') : []
  const classes = classnames('anticon', className)
  const lookup: IconLookup = { prefix: 'fas', iconName: `${iconClassArray[0]}` as IconName }
  const iconDefinition: IconDefinition = findIconDefinition(lookup)

  return (
    <FontAwesomeIcon
      icon={iconDefinition}
      size={size}
      rotation={rotation}
      className={classes}
      {...restProps}
    />
  )
}

export default Icon

import { configure } from '@storybook/react'
import getSortNumByMenu from './menu'
import '../src/styles/index.scss'
import './preview.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
}

const loaderFn = () => {
  const menus = [require('../.storybook/welcome.stories.mdx')]
  const target = require.context('../src/components', true, /\.stories\.mdx$/)
  target.keys().forEach((fname) => {
    let index = getSortNumByMenu(fname.split('/')[1])
    menus.splice(index, 0, target(fname))
  })
  return menus
}

configure(loaderFn, module)
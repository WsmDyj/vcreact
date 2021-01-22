import { configure } from '@storybook/react'
import getSortNumByMenu from './menu'
import '../src/components/style/index'
import './preview.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const compare = (property) => {
  return function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value1 - value2
  }
}
const loaderFn = () => {
  const menus = [require('../.storybook/welcome.stories.mdx')]
  const target = require.context('../src/components', true, /\.stories\.mdx$/)
  const arr = []
  target.keys().forEach((fname) => {
    let index = getSortNumByMenu(fname.split('/')[1])
    arr.push({ stories: fname, id: index})
  })
  arr.sort(compare('id')).forEach(item => {
    menus.push(target(item.stories))
  })
  return menus
}

configure(loaderFn, module)
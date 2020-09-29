/** 文档组件排序 */
const menuSort = {
  Icon: 1,
  Button: 2,
}

export default function getSortNumByMenu(menu) {
  return menuSort[menu]
}
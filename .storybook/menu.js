/** 文档组件排序 */
const menuSort = {
  Icon: 1,
  Button: 2,
  Tag: 3,
  Message: 4,
  Notification: 5,
  Alert: 6,
  Modal: 7,
  Radio: 8,
  Checkbox: 9,
  Switch: 10
}

export default function getSortNumByMenu(menu) {
  return menuSort[menu]
}
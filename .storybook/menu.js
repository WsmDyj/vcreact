/** 文档组件排序 */
const menuSort = {
  Icon: 1,
  Button: 2,
  Tag: 3,
  Message: 4,
  Notification: 5,
  Alert: 6,
  Modal: 7,
  Switch: 8,
  Checkbox: 9
}

export default function getSortNumByMenu(menu) {
  return menuSort[menu]
}
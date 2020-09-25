module.exports = {
  'modules/**/*.(js|vue)': [
    'cross-env EFF_ABSOLUTE_PATHS=true eslint --fix --format friendly',
    'git add'
  ]
}
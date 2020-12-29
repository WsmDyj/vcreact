import { tuple, ElementOf } from './type'

export const PresetStatusColorTypes = tuple('success', 'processing', 'error', 'default', 'warning')

export const PresetColorTypes = tuple(
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime'
)
export type PresetStatusColorType = ElementOf<typeof PresetStatusColorTypes>
export type PresetColorType = ElementOf<typeof PresetColorTypes>

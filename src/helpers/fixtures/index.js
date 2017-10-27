import { pipe, map, equals, findIndex } from 'ramda'
import flashTransforms from './flash.transforms'

export const transforms = {
  ...flashTransforms,
}

const findMissingTransformIndex = findIndex(equals(undefined))

const mapKeysToTransforms = map(
  key => (typeof key === 'function') ? key : transforms[key],
)

export default function fixtures(...transformKeys) {
  const transforms = mapKeysToTransforms(transformKeys)
  const missingIdx = findMissingTransformIndex(transforms)
  if (missingIdx >= 0) {
    throw new Error(
      `Invalid fixture transform: '${transformKeys[missingIdx]}'`
    )
  }
  return pipe(...transforms)()
}

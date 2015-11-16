export const debug = {
  exported: () => debug.callback,
  callback: _ => _,
}

export default debug.exported

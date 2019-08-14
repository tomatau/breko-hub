import { compact, get, ConfigService } from 'app/utils'

const getJavascripts = get('javascript', {})
const getStyles = get('styles', {})

export default function (assets) {
  const javascripts = getJavascripts(assets)
  const styles = getStyles(assets)

  return async function mapAssets(ctx, next) {
    ctx.assets = {
      headStyles: compact([
        styles.head,
      ]),
      inlineScripts: [
        `window.__CONFIG_ENV__ = ${JSON.stringify(ConfigService.getEnv())};`,
      ],
      headScripts: compact([
        javascripts.head,
      ]),
      deferredScripts: [
        javascripts.deferred,
      ],
      deferredStyles: compact([
        styles.deferred,
      ]),
    }
    await next()
  }
}

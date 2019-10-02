import { compact, get, ConfigService } from 'app/utils'

const getJavascripts = get('javascript', {})
const getStyles = get('styles', {})

export default function (assets) {
  const javascripts = getJavascripts(assets)
  const styles = getStyles(assets)

  return async function mapAssets(ctx, next) {
    ctx.assets = {
      headLinks: [ {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      }, {
        rel: 'preload',
        as: 'script',
        href: javascripts.head,
      } ],
      headStyles: compact([
        styles.head,
      ]),
      inlineScripts: [
        `window.__APP_CONFIG__ = ${JSON.stringify(ConfigService.getVars())};`,
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

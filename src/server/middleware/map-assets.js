import { compact, get, ConfigService } from 'app/utils'

const getJavascripts = get('javascript', {})
const getStyles = get('styles', {})

export default function (assets) {
  const javascripts = getJavascripts(assets)
  const styles = getStyles(assets)

  return async function mapAssets(ctx, next) {
    ctx.assets = {
      headScripts: compact([
        javascripts.head,
      ]),
      headStyles: compact([
        styles.body,
        styles.head,
      ]),
      bodyScripts: compact([
        javascripts.body,
      ]),
      stringScripts: [
        `window.__CONFIG_ENV__ = ${JSON.stringify(ConfigService.getEnv())};`,
      ],
    }
    await next()
  }
}

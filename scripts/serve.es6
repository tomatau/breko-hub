import '~/src/config/environment';
import './helpers/cssModulesHook.es6';
import koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import log from 'npmlog';
import {ROOT, STATIC} from '~/src/config/paths';

const app = koa()

app.use(serve(STATIC))
app.use(function *() {
  yield mount(require(ROOT + '/src/server'))
})

app.listen(process.env.PORT, () => {
  log.info(`Serving`, `http://localhost:${process.env.PORT}`)
})

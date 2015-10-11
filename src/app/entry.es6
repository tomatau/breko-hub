import createBrowserHistory from 'history/lib/createBrowserHistory';
import ReactDOM from 'react-dom';
import makeRoutes from '~/src/app/makeRoutes';
import {history} from '~/src/app/utils/history';

console.info(`Running in [${process.env.NODE_ENV}] environment`)

ReactDOM.render(
  makeRoutes(history),
  document.getElementById('application-root')
)

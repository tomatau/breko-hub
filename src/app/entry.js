import ReactDOM from 'react-dom'
import { socket } from 'app/services/socket'
import { dispatch } from 'app/services/store'
import { Main, Dev } from 'app/main'

debug.enable(process.env.DEBUG)

const log = {
  env: debug('environment'),
  sock: debug('socket'),
}

log.env(`Running in [${process.env.NODE_ENV}] environment`)

socket.on('connect', () => {
  log.sock('Client connected to socket')
  // example socket broadcast
  dispatch({
    type: 'NEW_SOCKET_SESSION',
    payload: { data: Math.random() },
    // next=false prevents the local dispatch
    meta: { broadcast: true, next: false },
  })
})

socket.open()

ReactDOM.render(
  Main, document.getElementById('application-root')
)

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(
    Dev, document.getElementById('debug-panel-root')
  )
}

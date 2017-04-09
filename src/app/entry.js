import ReactDOM from 'react-dom'
import socket from 'app/composition/socket'
import { store, Main } from 'app/main'

debug.enable(process.env.DEBUG)

const log = debug('entry')

log(`Running in [${process.env.NODE_ENV}] environment`)
log('Environment', process.env)

socket.on('connect', () => {
  log('Client connected to socket')
  // example socket broadcast
  store.dispatch({
    type: 'NEW_SOCKET_SESSION',
    payload: { data: Math.random() },
    // next=false prevents the local dispatch
    meta: { broadcast: true, next: false },
  })
})

socket.open()

ReactDOM.render(
  Main, document.getElementById('app-container')
)

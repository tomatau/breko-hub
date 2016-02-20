import { delay } from 'lodash'
import { call, put, fork, take } from 'redux-saga/effects'
import * as selectors from 'app/selectors'
import { removeMessage } from 'app/actions/flash'

const DAEMON = true
const log = {
  sagas: debug('sagas'),
}

const wait = (time) => new Promise(resolve => delay(resolve, time))

function * timeoutRemoveFlash(nextFlash) {
  if (nextFlash) {
    yield call(wait, 4000)
    yield put(removeMessage(nextFlash.id))
  }
}

function * helloSaga() {
  while (DAEMON) {
    const action = yield take('foo/GET')
    log.sagas('Hello Sagas!', { action })
  }
}

function * takeFlashMessages() {
  while (DAEMON) {
    const action = yield take('flash/ADD_MESSAGE')
    log.sagas('Hello Sagas!', { action })
    yield timeoutRemoveFlash(action.payload)
  }
}

export default function* rootSaga(getState) {
  yield fork(timeoutRemoveFlash, selectors.nextFlashMessage(getState()))
  yield fork(helloSaga)
  yield fork(takeFlashMessages)
}

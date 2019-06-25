import { take, put, takeEvery, call, all } from 'redux-saga/effects';
import { eventChannel, delay } from 'redux-saga';

import { GET_INSTRUMENTS_LIST, GET_ORDER_BOOK } from '../../constants';
import { getUsers } from '../../lib/api';

const ws = new WebSocket('wss://ws.bitstamp.net/');


const subscribeMsg = inst => ({
  event: 'bts:subscribe',
  data: {
    channel: `order_book_${inst}`
  }
});

const unSubscribeMsg = inst => ({
  event: 'bts:unsubscribe',
  data: {
    channel: `order_book_${inst}`
  }
});

function initWebsocket(data) {
  console.log(data, 'stream');
  const { selectedInstrument, prevInstrument } = data && data.payload;
  return eventChannel((emitter) => {
    prevInstrument && ws.send(JSON.stringify(unSubscribeMsg(prevInstrument.split('/').join('').toLowerCase())));
    !prevInstrument && ws.send(JSON.stringify(subscribeMsg(selectedInstrument.split('/').join('').toLowerCase())));

    ws.onerror = (error) => {
      console.log('WebSocket error ' + error);
      console.dir(error);
    }
    ws.onmessage = (e) => {
      let msg = null;
      try {
        msg = JSON.parse(e.data);
      } catch (exp) {
        console.error(`Error parsing : ${exp.data}`);
      }
      if (msg) {
        const { data, event } = msg;
        switch (event) {
          case 'data':
            emitter({ type: 'SET_DATA', payload: { ...data } });
            break;

          case 'REMOVE_BOOK':
            emitter({ type: 'REMOVE_BOOK', data });
            break;

          case 'bts:unsubscription_succeeded':
            ws.send(JSON.stringify(subscribeMsg(selectedInstrument.split('/').join('').toLowerCase())));
            break;
          default:
            // nothing to do
        }
      }
    };
    // unsubscribe function
    return () => {
      console.log('Socket off');
    };
  });
}

function* workerGetUsersSaga(data) {
  const channel = yield call(initWebsocket, data);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* getInstrumentList() {
  const response = yield call(getUsers);
  yield put({ type: 'SET_INSTRUMENTS', payload: response });
}

export default function* watchGetUsersSaga() {
  yield all([
    takeEvery(GET_INSTRUMENTS_LIST, getInstrumentList),
    takeEvery(GET_ORDER_BOOK, workerGetUsersSaga),
  ]);
}

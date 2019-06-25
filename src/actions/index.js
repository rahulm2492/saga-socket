import { GET_INSTRUMENTS_LIST, SET_DATA, GET_ORDER_BOOK } from '../constants';

export function setUsers(data) {
  return {
    type: SET_DATA,
    payload: data,
  };
}

export function getData(data) {
  return {
    type: GET_ORDER_BOOK,
    payload: data,
  };
}

//Sagas
export function getInstrumentsListSaga() {
  return {
    type: GET_INSTRUMENTS_LIST
  };
}

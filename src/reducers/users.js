import { SET_DATA } from '../constants';

const initialState = { users: [], bids: [], asks: [] };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        bids: [...action.payload.bids],
        asks: [...action.payload.asks],
      };
    case 'SET_INSTRUMENTS':
      return {
        ...state,
        instruments: action.payload
      };
    default:
      return state;
  }
}

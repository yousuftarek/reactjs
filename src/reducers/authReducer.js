import {
    STORE_TOKEN,
    DELETE_TOKEN
  } from '../actions/types';

  const initialState = {
    user: [],
    token: {}
  };

  export default function (state = initialState, action) {
    switch (action.type) {
      case STORE_TOKEN:
        return {
          ...state,
          token: action.payload,
          user: action.userData
        };
        case DELETE_TOKEN:
            return {
              ...state,
              token: {},
              user: []
            };
          
          default:
            return state;
    }
  }
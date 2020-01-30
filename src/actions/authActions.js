import { STORE_TOKEN, DELETE_TOKEN} from './types';

export const storeToken = (token, user) => dispatch => {
      dispatch({
        type: STORE_TOKEN,
        payload: token,
        userData: user
      })
};

export const deleteToken = () => dispatch => {
  dispatch({
    type: DELETE_TOKEN,
    payload: {}
  })
};
import * as LoginActions from '../../actions/login/login.action';
import { HttpResponseInterface } from '@app/shared';

export interface LoginState {
  data: HttpResponseInterface[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: LoginState = {
  data: [],
  loaded: false,
  loading: false,
};

export function reducer(state: LoginState = initialState, action: LoginActions.LoginActions) {
  switch (action.type) {
    // LOAD LOGIN TOKEN
    case LoginActions.LOAD_LOGIN:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case LoginActions.LOAD_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case LoginActions.LOAD_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload,
      };
  }
  return state;
}

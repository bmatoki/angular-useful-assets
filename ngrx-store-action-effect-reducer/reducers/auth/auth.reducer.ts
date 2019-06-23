import * as AuthActions from '../../actions/auth/auth.action';

export interface AuthState {
  data: any[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: AuthState = {
  data: [],
  loaded: false,
  loading: false,
};

export function reducer(state: AuthState = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    // LOAD AUTH TOKEN
    case AuthActions.LOAD_AUTH:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case AuthActions.LOAD_AUTH_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case AuthActions.LOAD_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload,
      };
  }
  return state;
}

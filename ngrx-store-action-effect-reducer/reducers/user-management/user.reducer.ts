import * as UserActions from '../../actions/user-management/user.action';
import { HttpUpdateResponseInterface } from '@app/shared';

export interface UserState {
  data: HttpUpdateResponseInterface[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  data: [],
  loaded: false,
  loading: false,
};

export function reducer(state: UserState = initialState, action: UserActions.UserActions) {
  switch (action.type) {
    // LOAD users
    case UserActions.LOAD_USERS:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case UserActions.LOAD_USERS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case UserActions.LOAD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload,
      };
      // CREATE user
    case UserActions.CREATE_USER:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case UserActions.CREATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case UserActions.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload,
      };
       // update user
    case UserActions.UPDATE_USER:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case UserActions.UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case UserActions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload,
      };
  }
  return state;
}

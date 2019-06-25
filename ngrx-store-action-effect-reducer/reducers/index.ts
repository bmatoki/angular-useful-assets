import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import * as fromLogin from './login/login.reducer';
import * as fromUser from './user-management/user.reducer';
import * as fromSnackBar from './snackBar.reducers';



export interface AuthState {
  auth: fromAuth.AuthState;
  snackBar: fromSnackBar.State;
}

export interface LoginState {
  login: fromLogin.LoginState;
  snackBar: fromSnackBar.State;
}

export interface UserState {
  user: fromUser.UserState;
  snackBar: fromSnackBar.State;
}

export const userReducer: ActionReducerMap<UserState> = {
  user: fromUser.reducer,
  snackBar: fromSnackBar.reducer,
};

export const authReducer: ActionReducerMap<AuthState> = {
  auth: fromAuth.reducer,
  snackBar: fromSnackBar.reducer,
};

export const loginReducer: ActionReducerMap<LoginState> = {
  login: fromLogin.reducer,
  snackBar: fromSnackBar.reducer,
};

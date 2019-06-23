import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import * as fromSnackBar from './snackBar.reducers';


export interface AuthState {
  auth: fromAuth.AuthState;
  snackBar: fromSnackBar.State;
}

export const authReducer: ActionReducerMap<AuthState> = {
  auth: fromAuth.reducer,
  snackBar: fromSnackBar.reducer,
};

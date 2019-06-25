import { Action } from '@ngrx/store';
import { HttpResponseInterface,Login } from '@app/shared';

export const LOAD_LOGIN = '[LOGIN] Load Login';
export const LOAD_LOGIN_FAIL = '[LOGIN] Load Login Fail';
export const LOAD_LOGIN_SUCCESS = '[LOGIN] Load Login Success';

export class LoadLogin implements Action {
  readonly type = LOAD_LOGIN;

  constructor(public payload: Login) { }
}

export class LoadLoginFail implements Action {
  readonly type = LOAD_LOGIN_FAIL;

  constructor(public payload: HttpResponseInterface) {  }
}

export class LoadLoginSuccess implements Action {
  readonly type = LOAD_LOGIN_SUCCESS;

  constructor(public payload: any) { }
}

export type LoginActions = LoadLogin | LoadLoginFail | LoadLoginSuccess;

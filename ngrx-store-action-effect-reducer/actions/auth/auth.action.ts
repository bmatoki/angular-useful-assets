import { Action } from '@ngrx/store';

export const LOAD_AUTH = '[AUTH] Load Auth';
export const LOAD_AUTH_FAIL = '[AUTH] Load Auth Fail';
export const LOAD_AUTH_SUCCESS = '[AUTH] Load Auth Success';

export class LoadAuth implements Action {
  readonly type = LOAD_AUTH;
}

export class LoadAuthFail implements Action {
  readonly type = LOAD_AUTH_FAIL;

  constructor(public payload: any) { }
}

export class LoadAuthSuccess implements Action {
  readonly type = LOAD_AUTH_SUCCESS;

  constructor(public payload: any) { }
}

export type AuthActions = LoadAuth | LoadAuthFail | LoadAuthSuccess;

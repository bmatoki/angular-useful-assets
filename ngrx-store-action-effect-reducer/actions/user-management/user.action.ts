import { Action } from '@ngrx/store';
import { HttpUpdateResponseInterface,
  RegisterUser,HttpResponseInterface } from '@app/shared';
export const LOAD_USERS = '[USERS] Load Users';
export const LOAD_USERS_FAIL = '[USERS] Load Users Fail';
export const LOAD_USERS_SUCCESS = '[USERS] Load Users Success';

export const CREATE_USER = '[USER] Create User';
export const CREATE_USER_FAIL = '[USER] Create User Fail';
export const CREATE_USER_SUCCESS = '[USER] Create User Success';

export const UPDATE_USER = '[USER] Update User';
export const UPDATE_USER_FAIL = '[USER] Update User Fail';
export const UPDATE_USER_SUCCESS = '[USER] Update User Success';

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;

  constructor() { }
}

export class LoadUsersFail implements Action {
  readonly type = LOAD_USERS_FAIL;

  constructor(public payload: HttpResponseInterface) { }
}

export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: HttpResponseInterface) { }
}

export class CreateUser implements Action {
  readonly type = CREATE_USER;

  constructor(public payload: RegisterUser) {  }
}

export class CreateUserFail implements Action {
  readonly type = CREATE_USER_FAIL;

  constructor(public payload: HttpResponseInterface) { }
}

export class CreateUserSuccess implements Action {
  readonly type = CREATE_USER_SUCCESS;

  constructor(public payload: HttpResponseInterface) { }
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: RegisterUser,public oldPayload:any) { }
}

export class UpdateUserFail implements Action {
  readonly type = UPDATE_USER_FAIL;

  constructor(public payload: any) { }
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;

  constructor(public payload: any) { }
}

export type UserActions =
 LoadUsers | LoadUsersFail | LoadUsersSuccess |
 CreateUser | CreateUserFail | CreateUserSuccess |
 UpdateUser |UpdateUserFail |UpdateUserSuccess ;

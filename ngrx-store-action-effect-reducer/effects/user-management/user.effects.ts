
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap,catchError,exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from '@app/core/store/actions/user-management/user.action';
import * as SnackBarActions from '@app/core/store/actions/snackBar.actions';
import { UserManagementService,LoginService,AuthService } from '@app/core';
import { MatSnackBarConfig } from '@angular/material';

@Injectable()
export class UserEffects {

  snackBarSuccessConfig: MatSnackBarConfig = {
    panelClass: 'snack-bar-success',
  };

  snackBarErrorConfig: MatSnackBarConfig = {
    panelClass: 'snack-bar-error',
  };

  constructor(private actions$: Actions,
              private userManagementService:UserManagementService,
              private loginService:LoginService,
              private authService:AuthService,
              ) { }

  // LOAD USERS EFFECTS

  @Effect()
  public loadUsers$ = this.actions$.ofType(UserActions.LOAD_USERS).pipe(
    exhaustMap(() =>
      this.userManagementService.getAllUsers().pipe(
        map((data) => {
          return new UserActions.LoadUsersSuccess(data);
        }),
        catchError((error) => {
          return of(new UserActions.LoadUsersFail(error));
        }),
      ),
    ),
  );

  @Effect()
  public loadUsersSuccess$ = this.actions$.ofType(UserActions.LOAD_USERS_SUCCESS).pipe(
        map((data:any) => new SnackBarActions.SnackbarOpen(
          { message:  'Loaded users successfully.' ,
            config: this.snackBarSuccessConfig })),
    );

  @Effect()
  public loadUsersFail$ = this.actions$.ofType(UserActions.LOAD_USERS_FAIL).pipe(
        map((err: any) => new SnackBarActions.SnackbarOpen(
          { message: err.payload.error.msg, config: this.snackBarErrorConfig })),
    );

  // Create USERS EFFECTS

  @Effect()
  public createUser$ = this.actions$.ofType(UserActions.CREATE_USER).pipe(
      exhaustMap((action: UserActions.CreateUser) =>
      this.userManagementService.createNewUser(action.payload).pipe(
        map((data) => {
          if (!data.success) {
            return new UserActions.CreateUserFail(data);
          }
          return new UserActions.CreateUserSuccess(data);
        }),
        catchError((error) => {
          return of(new UserActions.CreateUserFail(error));
        }),
      ),
    ),
);

  @Effect()
  public createUserSuccess$ = this.actions$.ofType(UserActions.CREATE_USER_SUCCESS).pipe(
        map((data:any) => new SnackBarActions.SnackbarOpen(
          { message:  data.payload.msg ,
            config: this.snackBarSuccessConfig })),
    );

  @Effect()
  public createUserFail$ = this.actions$.ofType(UserActions.CREATE_USER_FAIL).pipe(
        map((err: any) => new SnackBarActions.SnackbarOpen(
          { message: err.payload.msg ? err.payload.msg :err.payload.error.msg,
            config: this.snackBarErrorConfig })),
    );

  // UPDATE USERS EFFECTS

  @Effect()
  public updateUser$ = this.actions$.ofType(UserActions.UPDATE_USER).pipe(
      exhaustMap((action: UserActions.UpdateUser) =>
      this.userManagementService.editUserById(action.payload ,action.oldPayload).pipe(
        map((data) => {
          if (!data.success) {
            return new UserActions.UpdateUserFail(data);
          }
          if (data.token) {
            this.loginService.setToken = data.token;
            this.authService.setLoggedDetails(data.userDetails);
          }
          return new UserActions.UpdateUserSuccess(data);
        }),
        catchError((error) => {
          return of(new UserActions.UpdateUserFail(error));
        }),
      ),
    ),
);

  @Effect()
  public updateUserSuccess$ = this.actions$.ofType(UserActions.UPDATE_USER_SUCCESS).pipe(
        map((data:any) => new SnackBarActions.SnackbarOpen(
          { message:  data.payload.msg ,
            config: this.snackBarSuccessConfig })),
    );

  @Effect()
  public updateUserFail$ = this.actions$.ofType(UserActions.UPDATE_USER_FAIL).pipe(
        map((err: any) => new SnackBarActions.SnackbarOpen(
          { message: err.payload.msg ? err.payload.msg :err.payload.error.msg,
            config: this.snackBarErrorConfig })),
    );

}

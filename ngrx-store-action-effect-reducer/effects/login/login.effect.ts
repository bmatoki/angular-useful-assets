
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap,catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LoginActions from '@app/core/store/actions/login/login.action';
import * as SnackBarActions from '@app/core/store/actions/snackBar.actions';
import { AuthService,LoginService } from '@app/core';
import { MatSnackBarConfig } from '@angular/material';

@Injectable()
export class LoginEffects {

  snackBarSuccessConfig: MatSnackBarConfig = {
    panelClass: 'snack-bar-success',
  };

  snackBarErrorConfig: MatSnackBarConfig = {
    panelClass: 'snack-bar-error',
  };

  constructor(private actions$: Actions, private authService: AuthService,
              private router:Router,
              private loginService:LoginService) {}

  // LOAD LOGIN EFFECTS

  @Effect()
  public loadAuth$ = this.actions$.ofType(LoginActions.LOAD_LOGIN).pipe(
      switchMap((action: LoginActions.LoadLogin) =>
      this.loginService.doLogin(action.payload).pipe(
        map((data) => {
          if (data.success) {
            this.loginService.setToken = data.msg.token;
            this.authService.setLoggedDetails(data.msg.userDetail);
            this.router.navigate(['/logs']);
            return new LoginActions.LoadLoginSuccess(data);
          }
          return new LoginActions.LoadLoginFail(data);
        }),
        catchError((error) => {
          return of(new LoginActions.LoadLoginFail(error));
        }),
      ),
    ),
);

  @Effect()
  public loadAuthSuccess$ = this.actions$.ofType(LoginActions.LOAD_LOGIN_SUCCESS).pipe(
        map((data:any) => new SnackBarActions.SnackbarOpen(
          { message: !data.payload.success ? data.payload.msg  :  'Logged in Successfully.',
            config: this.snackBarSuccessConfig })),
    );

  @Effect()
  public loadAuthFail$ = this.actions$.ofType(LoginActions.LOAD_LOGIN_FAIL).pipe(
        map((err: any) => new SnackBarActions.SnackbarOpen(
          { message: err.payload.msg ? err.payload.msg :err.payload.error.msg
            , config: this.snackBarErrorConfig })),
    );

}


import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap,catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from '@app/core/store/actions/auth/auth.action';
import * as SnackBarActions from '@app/core/store/actions/snackBar.actions';
import { AuthService,LoginService } from '@app/core';
import { MatSnackBarConfig } from '@angular/material';

@Injectable()
export class AuthEffects {

  snackBarSuccessConfig: MatSnackBarConfig = {
    panelClass: 'snack-bar-success',
  };

  snackBarErrorConfig: MatSnackBarConfig = {
    panelClass: 'snack-bar-error',
  };

  constructor(private actions$: Actions, private authService: AuthService,
              private loginService:LoginService) { }

  // LOAD AUTH EFFECTS

  @Effect()
  public loadAuth$ = this.actions$.ofType(AuthActions.LOAD_AUTH).pipe(
      switchMap(() =>
      this.authService.getLoggedDetails().pipe(
        map(data => new AuthActions.LoadAuthSuccess(data.msg)),
        catchError((error) => {
          if (error.status === 401 || error.status === 403) {
            this.loginService.doLogOut();
          }
          return of(new AuthActions.LoadAuthFail(error));
        }),
      ),
    ),
);

  // @Effect()
  //   loadAuthSuccess$ = this.actions$.ofType(AuthActions.LOAD_AUTH_SUCCESS).pipe(
  //       map(() => new SnackBarActions.SnackbarOpen(
  //         { message: 'Auth Added Successfully', config: this.snackBarSuccessConfig })),
  //   );

  @Effect()
  public loadAuthFail$ = this.actions$.ofType(AuthActions.LOAD_AUTH_FAIL).pipe(
        map((err: any) => new SnackBarActions.SnackbarOpen(
          { message: 'Error', config: this.snackBarErrorConfig })),
    );

}

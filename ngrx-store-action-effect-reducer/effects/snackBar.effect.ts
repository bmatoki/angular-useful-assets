import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import * as SnackBarActions from '@app/core/store/actions/snackBar.actions';

@Injectable()
export class SnackbarEffects {

  constructor(private actions$: Actions,
              private matSnackBar: MatSnackBar) {
  }

  @Effect({
    dispatch: false,
  })
    closeSnackbar: Observable<any> = this.actions$.ofType(SnackBarActions.SNACKBAR_CLOSE)
        .pipe(
            tap(() => this.matSnackBar.dismiss()),
        );

  @Effect()
    showSnackbar: Observable<any> = this.actions$.ofType(SnackBarActions.SNACKBAR_OPEN)
        .pipe(
            map((action: SnackBarActions.SnackbarOpen) => action.payload),
            tap(payload => this.matSnackBar.open(payload.message, payload.action, payload.config)),
            delay(5000),
            map(() => new SnackBarActions.SnackbarClose()),
        );
}

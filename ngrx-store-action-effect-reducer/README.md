What is NgRx?
MANAGE STATE
NgRx Store provides reactive state management for Angular apps inspired by Redux. Unify the events in your application and derive state using RxJS.

i added an example for http request from auth service and material snack bar with ngrx , includes:
```
store  - RxJS powered state management for Angular apps, inspired by Redux.

action - Actions are one of the main building blocks in NgRx. Actions express unique events that happen throughout your application. From user interaction with the page, external interaction through network requests, and direct interaction with device APIs, these and more events are described with actions.

reducer - Reducers in NgRx are responsible for handling transitions from one state to the next state in your application. Reducer functions handle these transitions by determining which actions to handle based on the action's type.

effect -  Side effect model for @ngrx/store.
```


for use it you need to install

```
npm i @ngrx/store
npm i @ngrx/effects

```

in app.module you need to import ( change to your locations ) :

```
import { AuthEffects } from '@app/core/store/effects/auth/auth.effect';
import { reducers,authReducer } from '@app/core/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SnackbarEffects } from '@app/core/store/effects/snackBar.effect';

```

under imports :

```
    StoreModule.forRoot({
      auth:authReducer.auth,
    }),
    EffectsModule.forRoot([SnackbarEffects,AuthEffects]),
```

and here is an example from my component when you clicking on button or doing an action from the ui:


```

import { Component, OnInit,OnDestroy } from '@angular/core';
import { AuthService,LoginService,SharedDataService } from '@app/core';
import { LoggedInterface } from '@app/shared';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthState } from '@app/core/store';
import * as AuthActions from '@app/core/store/actions/auth/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit,OnDestroy {
  public loggedDetails:LoggedInterface;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private authService:AuthService,
              private sharedDataService:SharedDataService,
              private loginService:LoginService,
              private store: Store<AuthState>,
              ){}
  ngOnInit() {
    this.getUserDetails();
    if (this.authService.getToken) {
      this.getLoggedDetailsFromToken();
    }
  }

  getUserDetails() {
    return this.authService.loggedDetails.subscribe((details) => { this.loggedDetails = details; });
  }

  logOut(): void {
    this.loginService.doLogOut();
    // mat snack bar function
    this.sharedDataService.showNotification('Logout successfully.');
  }


  getLoggedDetailsFromToken() {
    this.store.select<any>('auth')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => this.authService.setLoggedDetails(data.data));
    this.store.dispatch(new AuthActions.LoadAuth());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}


```

you can see the store dispatch

```
  getLoggedDetailsFromToken() {
    this.store.select<any>('auth')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => this.authService.setLoggedDetails(data.data));
    this.store.dispatch(new AuthActions.LoadAuth());
  }

  // Destroy and unsubscribe.
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
```
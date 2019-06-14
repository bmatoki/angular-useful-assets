Angular’s route guards are interfaces which can tell the router whether or not it should allow navigation to a requested route. They make this decision by looking for a true or false return value from a class which implements the given guard interface.

There are five different types of guards and each of them is called in a particular sequence. The router’s behavior is modified differently depending on which guard is used. The guards are:

CanActivate
CanActivateChild
CanDeactivate
CanLoad
Resolve


For use auth guard you need to add to your app module under providers section:

```
providers:[ AuthGuard ]
```

and don't forget to import :

```
import { AuthGuard } from './auth.guard';
```

inside app-routing-module each route you want to protect add the following line :
```
    canActivate: [AuthGuard],
```

example of routing module:

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from '@app/core'

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

```

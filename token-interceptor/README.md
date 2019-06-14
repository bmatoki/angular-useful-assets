Why HTTP interceptors are useful? HTTP Interceptors are used for adding custom logic for logging, modifying response, error handling, but one common case is to automatically attach authentication informations to request and to refresh token in order to maintain user session active.

For use token interceptor you need to add to your app module under providers section:


```
providers : [
   {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
]
```

and don't forget to import the module

```
import { TokenInterceptor } from './token.interceptor';
```
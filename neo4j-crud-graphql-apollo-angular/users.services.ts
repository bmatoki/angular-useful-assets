import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { environment } from '@env/environment';
import { NgrxCacheModule,NgrxCache,apolloReducer } from 'apollo-angular-cache-ngrx';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import * as query from './crud.query';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(apollo: Apollo,httpLink: HttpLink,
              ngrxCache: NgrxCache) {

  apollo.create({
    link: httpLink.create({ uri: environment.gql_node_host }),
    cache: ngrxCache.create(),
    // in case you want to remove caching.
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  });
}

  deleteUserById(id) {
    return this.apollo.mutate<any>({
      mutation:query.deleteUser(id),
      variables:id,
    });
  }

  createUser(obj) {
    return this.apollo.mutate<any>({
      mutation:query.addNewUser(obj),
      variables:obj,
    });
  }

  updateUser(obj) {
    return this.apollo.mutate<any>({
      mutation:query.updateUserById(obj),
      variables:obj,
    });
  }

  getAllUsers() {
    return this.apollo.mutate<any>({
      query:query.getAllUsers(),
    });
  }


}
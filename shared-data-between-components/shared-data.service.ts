import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { HttpResponseInterface,LoggedInterface } from '@app/shared';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  address: string;
  headers: HttpHeaders;
  // one way for subject
  public loggedDetails = new Subject();

  // other way for behavior subject:
  private loggedDetailsOtherWayData = new BehaviorSubject<LoggedInterface>([]);
  public loggedDetailsOtherWay = this.loggedDetailsOtherWayData.asObservable();

  constructor(private http: HttpClient) {
    this.address = `${environment.login_nodehost}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  get getToken() {
    return localStorage.getItem('access_token');
  }

  // the first way
  public setLoggedDetails(payload) {
    this.loggedDetails.next(payload);
  }

  // the second way is the same
  setloggedDetailsOtherWayData (payload) {
    this.loggedDetailsOtherWayData.next(payload);
  }


  getLoggedDetails() {
    return this.http.post<HttpResponseInterface>(`${this.address}/decoded`,
                                                 { token:this.getToken },
                                                 { headers: this.headers });
  }

}

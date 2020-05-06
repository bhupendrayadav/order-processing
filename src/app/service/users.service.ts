import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  result:any[];
  constructor(private http:HttpClient) { }
  getUsersList(searchUser):Observable<any> {
    return this.http.get('https://tph-usersservice.azurewebsites.net/api/users/search?userName=' + searchUser)
    };
}

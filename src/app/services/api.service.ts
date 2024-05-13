import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getUserData(githubUsername: string) {
    return this.httpClient.get<any>(`https://api.github.com/users/${githubUsername}`);
  }

  getResult(URL: string){
    return this.httpClient.get<any>(URL);
  }


  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}

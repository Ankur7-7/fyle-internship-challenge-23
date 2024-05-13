import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import {User} from './user';
import {Repo} from './repo';
import { forkJoin, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  user_name!: string;
  user_data!: User;
  repo_data : Repo[]=[];
  user_exist :boolean=false;

  repo !: Repo;
  repoUrl ?: string;
  no_of_repos : number=0;
  count :number=0;
  

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // this.apiService.getUser('johnpapa').subscribe(console.log);
  }

  GetUserInfo(search_user: string): void{
    console.log(search_user);

    this.user_name = search_user.toLowerCase();
    this.user_data={
      "name": "",
      "bio": "",
      "location": "",
      "profileURL": "",
      "githubURL": "",
      "repoURL": "",
      "twitterURL": ""
    };
    this.repo_data = [];

    const StoredUserName = localStorage[this.user_name];
    const StoredRepoData = localStorage["repo-"+ this.user_name];

    if(StoredUserName && StoredRepoData){
      this.user_data = JSON.parse(StoredUserName);
      this.repo_data = JSON.parse(StoredRepoData);
      this.user_exist = true;
      return;
    }

    this.apiService.getUserData(this.user_name).pipe(
      catchError(error =>{
        console.error('Error fetching user data:', error);
        this.user_exist = false;
        return of(null);
      }),
      map((data: any) => {
        if(data?.message === 'Not Found') {
          console.log('User not found');
          return null;
        }

      this.user_exist = true;
      this.user_data.name = data.name;
      this.user_data.bio = data.bio;
      this.user_data.location = data.location;
      this.user_data.twitterURL = "https://twitter.com/" + data.twitter_username;
      this.user_data.githubURL = data.url;
      this.user_data.repoURL = data.repos_url; 
      this.user_data.profileURL = data.avatar_url;

      localStorage.setItem(this.user_name, JSON.stringify(this.user_data));

      return data;
      }),
    catchError(error=> of(null))
  ).subscribe((userData)=>{
      if(userData!=null)
        this.getRepo(this.user_data.repoURL);
      });
    }

  getRepo(url: string): void{
    this.apiService.getResult(url).pipe(
      catchError(error =>{
      console.error("Error fetching Repo Data: ", error);
      return of(null);
    })
  ).subscribe((data: any[])=>{
    if(data && data.length>0){
      const observables: Observable<any>[] = data.map((repo: any) =>{
        return this.apiService.getResult(repo.tags_url).pipe(
          catchError(error => {
            console.error("Error fetching tags: ", error);
            return of([]);
          })
        );
    });

    forkJoin(observables).subscribe((tags: any[])=>{
      this.repo_data = data.map((repo: any, index: number) => {
        return {
          "name": repo.name,
          "description": repo.description,
          "tags": tags[index]
        };
      });
      console.log(this.repo_data);
      localStorage.setItem(`repo-${this.user_name}`, JSON.stringify(this.repo_data));
    });
    }
    })
  }
}

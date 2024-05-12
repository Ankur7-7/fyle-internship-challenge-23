import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from './services/api.service';
import {User} from './user';
import {Repo} from './repo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  user_name!: string;
  user_data!: User;
  repo_data : Repo[]=[];
  repo !: Repo;
  repoUrl ?: string;
  no_of_repos : number=0;
  count :number=0;
  user_exist :boolean=false;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // this.apiService.getUser('johnpapa').subscribe(console.log);
  }

  GetUserInfo(search_user: string): void{
    console.log(search_user);
    this.user_name = search_user;
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

    if(localStorage[search_user]){
      this.user_data = JSON.parse(localStorage[search_user]);
      this.repo_data = JSON.parse(localStorage["repo-"+ search_user]);
      // console.log(this.user_data);
      // console.log(this.repo_data);
      return;
    }

    this.apiService.getUser(search_user).subscribe((data)=>{
      // console.log(data.name);
      // console.log(typeof data.name);

      if(data?.message=="Not Found"){
        console.log("user not found");
        return;
      }
      
      this.user_exist = true;

      this.user_data.name = data.name;
      this.user_data.bio = data.bio;
      this.user_data.location = data.location;
      this.user_data.twitterURL = "https://twitter.com/" + data.twitter_username;
      this.user_data.githubURL = data.url;
      this.user_data.repoURL = data.repos_url; 
      this.user_data.profileURL = data.avatar_url;

      // console.log(this.user_data);

      localStorage[this.user_name] = JSON.stringify(this.user_data);

      this.getRepo(this.user_data.repoURL)
    });

    // this.repoUrl = this.user_data.repos_url;
    // if(this.repoUrl){
    //   this.apiService.getRepos(this.repoUrl).subscribe((data)=>{
    //     this.repo_data = data;
    //     localStorage["repo-"+this.user_name] = this.repo_data;
    //     console.log(this.repoUrl);
    //     console.log(this.repo_data);
    //   })
    // }
  }

  getRepo(url: string){
    this.apiService.getResult(url).subscribe((data)=>{
      this.no_of_repos = data.length;
      this.count=0;

      data.forEach((element:any) => {

        this.apiService.getResult(element.tags_url).subscribe((tags)=>{ 
          
          this.repo = {
            "name": "",
            "description": "",
            "tags": []
          };
          
          this.count++;

          this.repo.name = element?.name;
          this.repo.description = element?.description;
          this.repo.tags = tags;
          this.repo_data.push(this.repo);

          // console.log(this.repo);
          // console.log(this.repo_data);

          console.log(this.repo_data);


          if(this.count==this.no_of_repos){
            localStorage["repo-"+this.user_name] = JSON.stringify(this.repo_data);
            console.log(this.repo_data);
          }
        })
      });

      // Case when there are no repos
      if(this.no_of_repos==0){
        localStorage["repo-"+this.user_name] = JSON.stringify(this.repo_data);
        // console.log(this.repo_data);
      }
    
    })
  }
}

import { Component, Input, OnInit} from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  @Input() UserData!: any;
  @Input() RepoData!: any;
  // profile_data !: any;
  // user_repos !: any;
  repo_url : string="";

  constructor(private apiService: ApiService){
  }

  ngOnInit(): void{

  }

  DisplayInfo(): void{

  }
}

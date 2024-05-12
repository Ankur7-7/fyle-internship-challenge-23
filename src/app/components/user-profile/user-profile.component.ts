import { Component, Input } from '@angular/core';
import {User} from '../../user';
import { faLocationDot, faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  @Input() ProfileData : User={
    "name": "",
    "bio": "",
    "location": "",
    "profileURL": "",
    "githubURL": "",
    "repoURL": "",
    "twitterURL": ""
  };

  faLocation = faLocationDot;
  faLink = faLink;

}

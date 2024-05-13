import { Component, Input } from '@angular/core';
import {User} from '../../user';
import { faLocationDot, faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  @Input() ProfileData : any;

  faLocation = faLocationDot;
  faLink = faLink;

}

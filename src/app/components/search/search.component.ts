import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  user: string='';
  @Output() display_user= new EventEmitter<string>();

  OnClick(user_name: string): void{

    this.display_user.emit(user_name);
  }
}

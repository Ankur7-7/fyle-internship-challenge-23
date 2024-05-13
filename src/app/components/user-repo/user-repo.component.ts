import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-user-repo',
  templateUrl: './user-repo.component.html',
  styleUrls: ['./user-repo.component.scss']
})
export class UserRepoComponent implements OnInit, OnChanges{

  @Input() Repos !: any[];
  paginated_Repos !: any[];
  

  pageEvent!: PageEvent;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit(){

  }

  ngOnChanges(change: SimpleChanges): void {
    if(change['Repos'] && this.Repos){
      console.log("Repo changed");
      this.pageSize = 10;
      this.pageIndex = 0;
      this.updatePage();
    }
  }
  
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePage();
  }

  updatePage() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginated_Repos = this.Repos.slice(startIndex, endIndex);
    this.ngOnInit();
  }
  
}

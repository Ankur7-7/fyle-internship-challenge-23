import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import {MatCardModule} from '@angular/material/card';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRepoComponent } from './components/user-repo/user-repo.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    UserInfoComponent,
    UserProfileComponent,
    UserRepoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
